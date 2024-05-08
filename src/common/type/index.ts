import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Request } from "express";
import { AdminEntity } from "src/core/entity/admin.entity";
import { IFindOptions } from "src/infrastructure/lib/baseService/interface";
import { FindOptionsRelations } from "typeorm";
import { Roles } from "../database/Enums";
export const DefaultRelationObj: FindOptionsRelations<AdminEntity> = {
	createdBy: true,
	updatedBy: true,
	deletedBy: true,
};
export type ID = number;

export class ObjDto {
	@ApiProperty({
		type: Number,
		description: "id",
	})
	@IsNotEmpty()
	@IsInt()
	id!: ID;
}

export interface RequestWithPayload extends Request {
	user: AuthPayload;
}

export interface AuthPayload {
	id: number;
	role: Roles;
}
