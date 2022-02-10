import { Injectable } from "@nestjs/common";
import { PersonelService } from "../personel/personel.service";
import { Personel } from "@prisma/client";
import * as bcrypt from "bcrypt";

import { JwtService } from "@nestjs/jwt";
import { CreatePersonelDto } from "../personel/dto/create-personel.dto";

@Injectable()
export class AuthService {
  constructor(private personelService: PersonelService, private jwtService: JwtService) {}

  async validatePersonel(email: string, password: string): Promise<Personel> {
    const personel = await this.personelService.findOneByEmail(email);

    if (personel && (await bcrypt.compare(password, personel.password))) {
      return personel;
    }

    return null;
  }

  async login(personel: Personel) {
    const payload = { email: personel.email, sub: personel.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createPersonelDto: CreatePersonelDto) {
    const personel = await this.personelService.findOneByEmail(createPersonelDto.email);

    if (personel) {
      return {
        message: "A personel member with that email already exists",
        statusCode: 409,
      };
    }

    return await this.personelService.create(createPersonelDto);
  }
}
