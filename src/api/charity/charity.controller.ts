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
import { ApiBearerAuth } from "@nestjs/swagger";
import { Roles } from "src/common/database/Enums";
import { CurrentAdmin } from "src/common/decorator/current-user";
import { ICurrentAdmin } from "src/common/interface/current-admin.interface";
import { RolesGuard } from "../auth/roles/RoleGuard";
import { RolesDecorator } from "../auth/roles/RolesDecorator";
import { JwtAuthGuard } from "../auth/user/AuthGuard";
import { CategoryService } from "../category/category.service";
import { FileService } from "../file/file.service";
import { CharityService } from "./charity.service";
import { CreateCharityDto } from "./dto/create-charity.dto";
import { UpdateCharityDto } from "./dto/update-charity.dto";
import { Request } from "express";
@Controller("charity")
export class CharityController {
	constructor(
		private readonly charityService: CharityService,
		private readonly fileService: FileService,
		private readonly categoryService: CategoryService,
	) {}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RolesDecorator(Roles.ADMIN, Roles.MANAGER)
	@Post()
	async create(@Req() req: Request, @Body() createCharityDto: CreateCharityDto) {
		const lang = (req.headers["lang"] || "en") as string;

		await this.fileService.findOneById(createCharityDto.file.id);
		await this.categoryService.findOneById(createCharityDto.category.id);

		return this.charityService.create(createCharityDto, lang);
	}

	@Get()
	findAll(@Req() req: Request) {
		const lang = (req.headers["lang"] || "en") as string;
		return this.charityService.findAll(lang, { relations: { file: true, category: true } });
	}

	@Get(":id")
	findOne(@Req() req: Request, @Param("id", ParseIntPipe) id: number) {
		const lang = (req.headers["lang"] || "en") as string;

		return this.charityService.findOneById(id, lang);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RolesDecorator(Roles.ADMIN, Roles.MANAGER)
	@Patch(":id")
	async update(
		@Req() req: Request,
		@Param("id", ParseIntPipe) id: number,
		@Body() updateCharityDto: UpdateCharityDto,
		@CurrentAdmin() admin: ICurrentAdmin,
	) {
		const lang = (req.headers["lang"] || "en") as string;

		if (updateCharityDto.category?.id) {
			await this.categoryService.findOneById(updateCharityDto.category.id);
		}
		if (updateCharityDto.file?.id) {
			await this.fileService.findOneById(updateCharityDto.file.id);
		}

		return this.charityService.update(id, updateCharityDto, lang, admin);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RolesDecorator(Roles.ADMIN, Roles.MANAGER)
	@Delete(":id")
	remove(@Req() req: Request, @Param("id", ParseIntPipe) id: number) {
		const lang = (req.headers["lang"] || "en") as string;

		return this.charityService.delete(id, lang);
	}
}
