import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./strategies/local/local-auth.guard";
import { AuthService } from "./auth.service";
import { CreatePersonelDto } from "../personel/dto/create-personel.dto";
import { Public } from "./public.decorator";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() req) {
    const loggedIn = await this.authService.login(req.user);

    return {
      data: loggedIn,
      message: "User logged in",
    };
  }

  @Post("register")
  async register(@Body() createPersonelDto: CreatePersonelDto) {
    const registered = await this.authService.register(createPersonelDto);

    return {
      data: registered,
      message: "User registered",
    };
  }
}
