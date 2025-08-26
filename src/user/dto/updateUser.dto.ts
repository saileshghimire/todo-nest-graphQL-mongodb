import { Field, InputType, OmitType, PartialType } from "@nestjs/graphql";
import { CreateUserDto } from "./createUser.dto";


@InputType()
export class UpdateUserDto extends OmitType(
    PartialType(CreateUserDto),
    ['email', 'password'] as const,
){
    @Field(() => String)
    _id: string;
}