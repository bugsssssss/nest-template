import { IsNotEmpty, IsString } from "class-validator";

export class CreateQuestionAnswerDto {
	@IsNotEmpty()
	@IsString()
	questionUz!: string;
	@IsNotEmpty()
	@IsString()
	questionRu!: string;
	@IsNotEmpty()
	@IsString()
	questionEn!: string;

	@IsNotEmpty()
	@IsString()
	answerUz!: string;
	@IsNotEmpty()
	@IsString()
	answerRu!: string;
	@IsNotEmpty()
	@IsString()
	answerEn!: string;
}
