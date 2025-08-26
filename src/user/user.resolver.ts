import { ResolveField, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './user.entity';

@Resolver(()=> User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
    ) {}
    @ResolveField(() => String)
    fullName(user: User){
        return `${user.firstName} ${user.middleName? user.middleName + ' ' : ''}${user.lastName}`;
    }


    async updateUser(id:string,updateUserInput: UpdateUserDto):Promise<any>{
        return this.userService.updateUser(id,updateUserInput);
    }

    async deleteUser(id:string):Promise<void>{
        return this.userService.deleteUser(id);
    }

    async getUser(){
        return this.userService.getAllUsers();
    }
}
