import { Injectable } from '@nestjs/common';
import { PersonelService } from '../personel/personel.service';
import { Personel } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private personelService: PersonelService,
    private jwtService: JwtService,
  ) {}

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
}
