import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PersonelModule } from "../personel/personel.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { LocalStrategy } from "./strategies/local/local.strategy";
import { AuthController } from "./auth.controller";
import { APP_GUARD } from "@nestjs/core";
import { RoleGuard } from "../personel/roles/role.guard";
import { JwtAuthGuard } from "./strategies/jwt/jwt-auth.guard";

@Module({
  imports: [
    PersonelModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "31d" },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    //{ provide: APP_GUARD, useClass: JwtAuthGuard },
    //{ provide: APP_GUARD, useClass: RoleGuard },
  ],
  exports: [AuthService],
})
export class AuthModule {}
