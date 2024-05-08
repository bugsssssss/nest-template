import { Type } from "class-transformer";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { ObjDto } from "src/common/type";

export class CreateCharityDto {
	@IsNotEmpty()
	@IsString()
	titleUz!: string;
	@IsNotEmpty()
	@IsString()
	titleRu!: string;
	@IsNotEmpty()
	@IsString()
	titleEn!: string;

	@IsNotEmpty()
	@IsString()
	infoUz!: string;
	@IsNotEmpty()
	@IsString()
	infoRu!: string;
	@IsNotEmpty()
	@IsString()
	infoEn!: string;

	@IsNotEmpty()
	@Type(() => ObjDto)
	@ValidateNested({ each: true })
	file!: ObjDto;

	@IsNotEmpty()
	@Type(() => ObjDto)
	@ValidateNested({ each: true })
	category!: ObjDto;
}
