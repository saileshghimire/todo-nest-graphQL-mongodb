import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { HashingProvider } from 'src/user/provider/hashing.provider';
import { BcryptProvider } from 'src/user/provider/bcrypt.provider';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthorizationGuard } from './guard/authorization.gurad';

@Module({
  imports:[
    forwardRef(()=>UserModule),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      inject:[ConfigService],
    }),
  ],
  providers: [
    AuthService, 
    AuthResolver,
    {
      provide: HashingProvider,
      useClass: BcryptProvider
    },
    AuthorizationGuard,
  ],
  exports:[AuthService, JwtModule]
})
export class AuthModule {}
