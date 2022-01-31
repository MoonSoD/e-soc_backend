import { Module } from "@nestjs/common";
import { PersonelService } from "./personel.service";
import { PersonelController } from "./personel.controller";
import { PrismaService } from "../prisma/prisma.service";

import { JwtStrategy } from "../auth/strategies/jwt/jwt.strategy";

@Module({
  controllers: [PersonelController],
  providers: [PersonelService, PrismaService, JwtStrategy],
  exports: [PersonelService],
})
export class PersonelModule {}
