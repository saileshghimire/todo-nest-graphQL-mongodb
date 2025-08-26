import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { User } from 'src/user/user.entity';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService:AuthService,
        private readonly userService:UserService,
    ){}

    @Mutation(()=>String)
    async login(
        @Args('loginInput' ) loginInput:LoginDto
    ):Promise<any>{
        return await this.authService.login(loginInput);
        // console.log(resposne);
        // return resposne.access_token;
    }

    @Mutation(() => User)
    async signup(
        @Args('signupInput' ) signupInput:CreateUserDto
    ):Promise<any>{
// mutation{
//     signup(signupInput:{
//         firstName:"Sailesh",
//         lastName:"Ghimire",
//         email:"sailesh.ghimire+1@ebpearls.com",
//         password:"1234"
//     }){
//         _id
//         fullName
//         email
//     }
//     }

        const isUserExist = await this.userService.getUserByEmail(signupInput.email);
        if(isUserExist){
            throw new Error('User already exists');
        }
        const newUser = await this.userService.createUser(signupInput);
        return newUser;
    }
}
