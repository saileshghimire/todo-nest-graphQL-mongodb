import { Field, InputType } from "@nestjs/graphql";
import { EmailAddressResolver } from "graphql-scalars";


@InputType()
export class CreateUserDto {
    
    @Field(() => String)
    firstName: string;
    @Field(() => String, { nullable: true })
    middleName?: string;
    @Field(() => String)
    lastName: string;
    @Field(() => EmailAddressResolver)
    email: string;
    @Field(() => String)
    password: string;
}