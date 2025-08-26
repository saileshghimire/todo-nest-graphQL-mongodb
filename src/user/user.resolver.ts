import { Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
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

    @Mutation(() => User)
    async updateUser(id:string,updateUserInput: UpdateUserDto):Promise<any>{
        return this.userService.updateUser(id,updateUserInput);
    }

    @Mutation(() => Boolean)
    async deleteUser(id:string):Promise<void>{
        return this.userService.deleteUser(id);
    }

    @Query(() => [User])
    async getUser(){
        return this.userService.getAllUsers();
    }
}
