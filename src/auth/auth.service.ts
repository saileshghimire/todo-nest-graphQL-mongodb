import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { HashingProvider } from 'src/user/provider/hashing.provider';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly hashingProvider:HashingProvider,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ){}

    async login(data:LoginDto):Promise<any>{
        const user = await this.userService.getUserByEmail(data.email);
        if(!user){
            return new NotFoundException('User not found');
        }
        const isPasswordValid = await this.hashingProvider.comparePassword(data.password, user.password);
        if(!isPasswordValid){
            return new UnauthorizedException('Invalid Password');
        }
        return this.generateToken(user);
        
    }

    private async generateToken(user:User):Promise<string>{
        const payload = { sub: user._id, email: user.email };
        const access_token = this.jwtService.sign(
            payload,{
                secret: this.configService.get<string>('JWT_SECRET'),
                expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
            }
        )
        return access_token;
    }
    
}
