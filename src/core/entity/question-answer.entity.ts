import { BaseEntity } from "src/common/database/BaseEntity";
import { Column, Entity } from "typeorm";

@Entity("questions_answers")
export class QuestionAnswerEntity extends BaseEntity {
	@Column({ name: "question_uz", type: "varchar" })
	questionUz!: string;
	@Column({ name: "question_ru", type: "varchar" })
	questionRu!: string;
	@Column({ name: "question_en", type: "varchar" })
	questionEn!: string;

	@Column({ name: "answer_uz", type: "varchar" })
	answerUz!: string;
	@Column({ name: "answer_ru", type: "varchar" })
	answerRu!: string;
	@Column({ name: "answer_en", type: "varchar" })
	answerEn!: string;
}
