import { Repository } from 'typeorm';
import { QuestionAnswerEntity } from '../entity/question-answer.entity';

export type QuestionAnswerRepository = Repository<QuestionAnswerEntity>;
