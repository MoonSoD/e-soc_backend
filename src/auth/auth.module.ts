import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PersonelModule } from '../personel/personel.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local/local.strategy';

@Module({
  imports: [
    PersonelModule,
    PassportModule,
    JwtModule.register({
      secret: 'SECRETT',
      signOptions: { expiresIn: '31d' },
    }),
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
