import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ICurrentAdmin } from "src/common/interface/current-admin.interface";
import { QuestionAnswerEntity } from "src/core/entity/question-answer.entity";
import { QuestionAnswerRepository } from "src/core/repository/question-answer.repository";
import { BaseService } from "src/infrastructure/lib/baseService";
import { getDateInNumber } from "src/infrastructure/lib/getDateByTimeZone";
import { returnResponseMessage } from "src/infrastructure/lib/prompts/successResponsePrompt";
import { CreateQuestionAnswerDto } from "./dto/create-question-answer.dto";
import { UpdateQuestionAnswerDto } from "./dto/update-question-answer.dto";

@Injectable()
export class QuestionAnswerService extends BaseService<
	CreateQuestionAnswerDto,
	UpdateQuestionAnswerDto,
	QuestionAnswerEntity
> {
	constructor(@InjectRepository(QuestionAnswerEntity) repository: QuestionAnswerRepository) {
		super(repository, "Question-Answer");
	}
	async update(
		id: number,
		dto: UpdateQuestionAnswerDto,
		lang: string = "en",
		admin?: ICurrentAdmin,
	) {
		await this.findOneById(id);
		const currentDateInNumber = getDateInNumber();
		const result = await this.getRepository.update(id, {
			...dto,
			updatedBy: admin,
			updatedAt: currentDateInNumber,
		});
		const responseMessages = [
			`Question&Answer was updated`,
			`Question&Answer был обновилась!`,
			`Question&Answer yangilandi!`,
		];
		const message = returnResponseMessage(responseMessages, lang);
		return { data: result, status: 200, message };
	}
}
