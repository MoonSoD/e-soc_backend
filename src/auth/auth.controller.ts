import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './strategies/local/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Req() req) {
    return this.authService.login(req.user);
  }
}
