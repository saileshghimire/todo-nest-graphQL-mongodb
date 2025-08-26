import { Injectable } from "@nestjs/common";
import { HashingProvider } from "./hashing.provider";
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashingProvider{
    async hashPassword(password: string | Buffer): Promise<string> {
        let salt = await bcrypt.genSalt();
        return bcrypt.hash(password, salt);
    } 

    public comparePassword(password: string | Buffer, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
    
}