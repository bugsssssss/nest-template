import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
	@IsNotEmpty()
	@IsString()
	nameUz!: string;
    
	@IsNotEmpty()
	@IsString()
	nameRu!: string;
    
	@IsNotEmpty()
	@IsString()
	nameEn!: string;
    
}
