import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { REQUEST_USER_KEY } from "src/constants/constants";


@Injectable()
export class AuthorizationGuard implements CanActivate{
    constructor(
        private readonly jwtService: JwtService,
    ){}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        const token = request.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new UnauthorizedException('No token provided');
        }
        try {
            const payload = await this.jwtService.verify(token)
            request[REQUEST_USER_KEY] = payload.sub;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}