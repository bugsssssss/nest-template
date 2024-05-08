import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "./pagination.dto";

export class FilterDto extends PaginationDto {
	@ApiProperty({ type: String, required: false })
	@IsOptional()
	@IsString()
	@Type(() => String)
	search!: string;
}
