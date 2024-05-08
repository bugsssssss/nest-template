import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseIntPipe,
	UseGuards,
	Req,
} from "@nestjs/common";
import { QuestionAnswerService } from "./question-answer.service";
import { CreateQuestionAnswerDto } from "./dto/create-question-answer.dto";
import { UpdateQuestionAnswerDto } from "./dto/update-question-answer.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/user/AuthGuard";
import { RolesGuard } from "../auth/roles/RoleGuard";
import { RolesDecorator } from "../auth/roles/RolesDecorator";
import { Roles } from "src/common/database/Enums";
import { Request } from "express";
@Controller("question-answer")
export class QuestionAnswerController {
	constructor(private readonly questionAnswerService: QuestionAnswerService) {}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RolesDecorator(Roles.ADMIN, Roles.MANAGER)
	@Post()
	create(@Req() req: Request, @Body() createQuestionAnswerDto: CreateQuestionAnswerDto) {
		const lang = (req.headers["lang"] || "en") as string;

		return this.questionAnswerService.create(createQuestionAnswerDto, lang);
	}

	@Get()
	findAll(@Req() req: Request) {
		const lang = (req.headers["lang"] || "en") as string;
		console.log(lang);

		return this.questionAnswerService.findAll(lang);
	}

	@Get(":id")
	findOne(@Req() req: Request, @Param("id", ParseIntPipe) id: number) {
		const lang = (req.headers["lang"] || "en") as string;

		return this.questionAnswerService.findOneById(id, lang);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RolesDecorator(Roles.ADMIN, Roles.MANAGER)
	@Patch(":id")
	update(
		@Req() req: Request,
		@Param("id", ParseIntPipe) id: number,
		@Body() updateQuestionAnswerDto: UpdateQuestionAnswerDto,
	) {
		const lang = (req.headers["lang"] || "en") as string;

		return this.questionAnswerService.update(id, updateQuestionAnswerDto, lang);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RolesDecorator(Roles.ADMIN, Roles.MANAGER)
	@Delete(":id")
	remove(@Req() req: Request, @Param("id", ParseIntPipe) id: number) {
		const lang = (req.headers["lang"] || "en") as string;

		return this.questionAnswerService.delete(id, lang);
	}
}
