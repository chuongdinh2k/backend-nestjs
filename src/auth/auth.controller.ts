import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { UserLoginDto } from './dtos/user-login.dto';
import { LoginStatus } from './interface/login-status';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() userDto: CreateUserDto) {
    const user = await this.authService.register(userDto);
    return user;
  }

  @Post('/login')
  async login(@Body() userLoginDto: UserLoginDto): Promise<LoginStatus> {
    console.log('userLoginDto', userLoginDto);
    const result = await this.authService.login(userLoginDto);
    return result;
  }

  @Post('refreshToken')
  async refreshToken(@Body() refreshTokeDto: RefreshTokenDto) {
    const rs = await this.authService.refreshToken(refreshTokeDto.refreshToken);
    return {
      refreshToken: rs,
    };
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async me(@Request() req: any) {
    const { email } = req;
    return this.authService.me(email);
  }
}
