import { forwardRef, Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { HashingProvider } from './provider/hashing.provider';
import { BcryptProvider } from './provider/bcrypt.provider';


@Module({
  imports:[
    MongooseModule.forFeature([
      { name:'User', schema:UserSchema}
    ]),
    forwardRef(()=>AuthModule),

  ],

  providers: [
    UserResolver, 
    UserService,
    {
      provide: HashingProvider,
      useClass:BcryptProvider,
    }

  ],
  exports:[UserService]
})
export class UserModule {}
