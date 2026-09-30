import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModel, UserRepository } from '../DB';
import { TokenService } from '../common/services/token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModel,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'easygenerator-secret-key-12345',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, TokenService],
})
export class UserModule {}
