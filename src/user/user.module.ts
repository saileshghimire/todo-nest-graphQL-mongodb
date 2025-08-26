import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.entity';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name:'User', schema:UserSchema}
    ])
  ],

  providers: [UserResolver, UserService]
})
export class UserModule {}
