import { Request, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RegisterDto } from '../dto/create-auth.dto';
import { LocalAuthGuard } from '../gaurds/auth.gaurd.local';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
