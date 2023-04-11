import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/core/types/auth/payload.interface';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { UserDto } from 'src/user/dtos/user.dto';
import { UserEntity } from 'src/user/enitity/user.entity';
import { UserService } from 'src/user/user.service';
import { UserLoginDto } from './dtos/user-login.dto';
import { LoginStatus } from './interface/login-status';
import 'dotenv/config';
import { IAccessToken } from './interface/access-token';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.userService.createUser(userDto);
    return user;
  }

  async login(userLoginDto: UserLoginDto): Promise<LoginStatus> {
    const { email, password } = userLoginDto;
    const user = await this.userService.findOneByLogin({ email, password });

    // generate and sign token
    const token = await this._createToken(user);
    const refreshToken = await this._createRefreshToken(user);
    return {
      email: user.email,
      accessToken: token,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string): Promise<string> {
    try {
      const data: IAccessToken = await this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_TOKEN_REFRESH_SECRET,
      });
      const accessToken = await this._createToken({ email: data.email });
      return accessToken;
    } catch (err) {
      throw new HttpException('Refresh token invalid', HttpStatus.BAD_REQUEST);
    }
  }

  private async _createToken({ email }: { email: string }) {
    const expiresIn = process.env.JWT_EXPIRES;
    const options = {
      expiresIn: expiresIn,
      secret: process.env.JWT_SECRET,
    };
    const accessToken = this.jwtService.sign({ email }, options);
    return accessToken;
  }

  private async _createRefreshToken({ email }: UserDto) {
    const expiresIn = process.env.JWT_REFRESH_EXPIREIN;
    const tokenRefreshSecret = process.env.JWT_TOKEN_REFRESH_SECRET;
    const options = {
      expiresIn: expiresIn || '7d',
      secret: tokenRefreshSecret,
    };
    const refreshToken = this.jwtService.sign({ email }, options);
    return refreshToken;
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.userService.findOneByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
  async me(email: string): Promise<any> {
    return this.userService.findOne({ where: { email: email } });
  }
}
