import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { Model } from 'mongoose';
import { HashingProvider } from './provider/hashing.provider';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User')
        private readonly userModel: Model<UserDocument>,

        @InjectConnection()
        private readonly connection,

        private readonly hashingProvider:HashingProvider
    ) {}

    async createUser(userData: CreateUserDto): Promise<UserDocument> {
        const user = await this.userModel.create({
            ...userData,
            password: await this.hashingProvider.hashPassword(userData.password)
        });
        return user;
    }

    async updateUser(userId: string, updateData: Partial<CreateUserDto>): Promise<UserDocument | null> {
        const user = await this.userModel.findByIdAndUpdate(userId, updateData, { new: true });
        return user;
    }

    async deleteUser(userId: string): Promise<void> {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            // await this.postModel.deleteMany({ userId }, { session });
            await this.userModel.findByIdAndDelete(userId, { session });
            await session.commitTransaction();

          } catch (e) {
            await session.abortTransaction();
            throw e;
          } finally{
            session.endSession();
          }
    }

    async getUserById(userId: string): Promise<UserDocument | null> {
        return this.userModel.findById(userId).exec();
    }

    async getUserByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async getAllUsers(): Promise<UserDocument[]> {
        return this.userModel.find().exec();
    }

}
