import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../DB';
import { AddUserDTO, LoginDTO } from './user.dto';
import { Compare } from '../common';
import { TokenService } from '../common/services/token.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

  async signup(body: AddUserDTO) {
    const { email, name, password, confirmPassword } = body;

    if (confirmPassword !== password) {
      throw new BadRequestException(
        'password and confirm password does not match',
      );
    }

    const exisingUser = await this.userRepo.findOne({ email });
    if (exisingUser) {
      throw new ConflictException('User Already exist');
    }

    const user = await this.userRepo.create({
      email,
      name,
      password,
    });

    if (!user) {
      throw new ForbiddenException('User Not created');
    }

    return {
      status: 201,
      message: 'User Created successfully',
      data: user,
    };
  }

  async login(body: LoginDTO) {
    const { email, password } = body;

    const existingUser = await this.userRepo.findOne({ email });

    if (!existingUser) {
      throw new NotFoundException('User not Found');
    }

    const passwordMatch = await Compare(password, existingUser.password);

    if (!passwordMatch) {
      throw new BadRequestException('Invalid password');
    }

    const access_token = await this.tokenService.generateToken({
      userId: existingUser.id,
      email,
    });

    const refresh_token = await this.tokenService.generateToken({
      userId: existingUser.id,
      email,
    });

    return {
      status: 200,
      message: 'User Logged in successfully',
      access_token,
      refresh_token,
    };
  }

  async userProfile(id: string) {
    const existingUser = await this.userRepo.findOne({ _id: id });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    return {
      status: 200,
      message: `Welcome ${existingUser.name} to the application`,
      data: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    };
  }
}
