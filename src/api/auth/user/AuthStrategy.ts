import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { AuthorizationError } from "../exception";
import { AdminEntity } from "src/core/entity/admin.entity";
import { AdminRepository } from "src/core/repository/admin.repository";
import { config } from "src/config";
import { AuthPayload } from "src/common/type";
import { Roles } from "src/common/database/Enums";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
	constructor(@InjectRepository(AdminEntity) private adminRepository: AdminRepository) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.JWT_SECRET_KEY,
		});
	}

	async validate(payload: AuthPayload) {
		let user: AdminEntity | null = null;
		// all app roles should include there, if not except roles doesnt work other part of the project
		if (payload.role === Roles.ADMIN) {
			user = await this.adminRepository.findOneBy({ id: payload.id, role: Roles.ADMIN });
		} else if (payload.role === Roles.MANAGER) {
			user = await this.adminRepository.findOneBy({ id: payload.id, role: Roles.MANAGER });
		} 
		if (!user) {
			throw new AuthorizationError();
		}

		return user;
	}
}
