import { AuthGuard } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AdminEntity } from "src/core/entity/admin.entity";
import { AuthorizationError } from "../exception";


@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
	handleRequest<T = AdminEntity>(error: unknown, user: T): T {
		
		if (error || !user) {			
			throw error || new AuthorizationError();
		}

		return user;
	}
} 
