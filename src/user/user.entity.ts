import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { EmailAddressResolver } from "graphql-scalars";
import { BaseModel, ModelPlugin } from "../common/modelPlugin.model";

@Schema()
@ObjectType()
export class User extends BaseModel {
    @Field(() => String)
    _id: string;

    @Prop({ required: true })
    @Field(() => String)
    firstName: string;

    @Prop()
    @Field(() => String, { nullable: true })
    middleName?: string;

    @Prop({ required: true })
    @Field(() => String)
    lastName: string;

    @Prop({ 
        type: String,
        unique: true,
        index: true,
        required: true 
    })
    @Field(() => EmailAddressResolver)
    email: string;

    @Prop({ required: true })
    password: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

// Apply the plugin
UserSchema.plugin(ModelPlugin);
