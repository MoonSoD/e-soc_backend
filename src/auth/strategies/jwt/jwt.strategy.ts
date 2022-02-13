import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PersonelService } from "../../../personel/personel.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private personelService: PersonelService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.personelService.findOne(payload?.sub);

    if (!user) {
      return new UnauthorizedException();
    }

    return user;
  }
}
