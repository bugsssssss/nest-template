import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class CreateFileDto {
	@ApiProperty({ type: String, required: false })
	@IsOptional()
	fileName!: string;

	@IsOptional()
	path!: string;

	@IsOptional()
	size!: number;

	@IsOptional()
	mimeType!: string;
}

export class CreateFileApiDto {
	@ApiProperty({ type: String, format: "binary" })
	file!: Express.Multer.File;
}
