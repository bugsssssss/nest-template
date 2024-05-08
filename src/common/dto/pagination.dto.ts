import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class PaginationDto {
	@ApiProperty({ type: Number, required: false, default: 1 })
	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	page: number = 1;

	@ApiProperty({ type: Number, required: false, default: 10 })
	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	pageSize: number = 10;
}
