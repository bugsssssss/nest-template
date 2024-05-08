import { Module } from "@nestjs/common";
import { QuestionAnswerService } from "./question-answer.service";
import { QuestionAnswerController } from "./question-answer.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuestionAnswerEntity } from "src/core/entity/question-answer.entity";

@Module({
	imports: [TypeOrmModule.forFeature([QuestionAnswerEntity])],
	controllers: [QuestionAnswerController],
	providers: [QuestionAnswerService],
})
export class QuestionAnswerModule {}
