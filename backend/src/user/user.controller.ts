import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AddUserDTO, LoginDTO } from './user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthenticationGuard } from '../common';

@Controller('user')
@ApiTags('Auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User Created' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  signup(@Body() body: AddUserDTO) {
    return this.userService.signup(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login User' })
  @ApiResponse({ status: 200, description: 'User Login successfully' })
  @ApiResponse({ status: 404, description: 'User Not Found' })
  login(@Body() body: LoginDTO) {
    return this.userService.login(body);
  }

  @Get('profile')
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Protected profile endpoint' })
  @ApiResponse({ status: 200, description: 'User Profile' })
  @ApiResponse({ status: 401, description: 'UnAuthorized user' })
  getProfile(@Req() req: any) {
    return this.userService.userProfile(req.user.userId);
  }
}
