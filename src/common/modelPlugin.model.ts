import { Field, ObjectType } from "@nestjs/graphql";
import mongoose from "mongoose";

export function ModelPlugin(schema: mongoose.Schema) {
    schema.add({
        createdAt: {
            type: Date,
            default: Date.now,
            immutable: true,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            immutable: true,
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    });

    // Update the updatedAt field on save
    schema.pre('save', function() {
        if (!this.isNew) {
            this.updatedAt = new Date();
        }
    });
}

@ObjectType()
export class BaseModel {
    @Field(() => Date, { nullable: true })
    createdAt?: Date;

    @Field(() => Date, { nullable: true })
    updatedAt?: Date;

    @Field(() => String, { nullable: true })
    createdBy?: string;

    @Field(() => String, { nullable: true })
    updatedBy?: string;
}