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
import { AdminEntity } from "src/core/entity/admin.entity";
import { RolesGuard } from "../auth/roles/RoleGuard";
import { RolesDecorator } from "../auth/roles/RolesDecorator";
import { JwtAuthGuard } from "../auth/user/AuthGuard";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Request } from "express";
@Controller("category")
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RolesDecorator(Roles.ADMIN, Roles.MANAGER)
	@Post()
	create(@Req() req: Request, @Body() createCategoryDto: CreateCategoryDto) {
		const lang = (req.headers["lang"] || "en") as string;

		return this.categoryService.create(createCategoryDto,lang);
	}

	@Get()
	findAll(@Req() req: Request) {
		const lang = (req.headers["lang"] || "en") as string;

		return this.categoryService.findAll(lang);
	}

	@Get(":id")
	findOne(@Req() req: Request, @Param("id", ParseIntPipe) id: number) {
		const lang = (req.headers["lang"] || "en") as string;

		return this.categoryService.findOneById(id,lang);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RolesDecorator(Roles.ADMIN, Roles.MANAGER)
	@Patch(":id")
	update(
		@Req() req: Request,
		@Param("id", ParseIntPipe) id: number,
		@Body() updateCategoryDto: UpdateCategoryDto,
		@CurrentAdmin() admin: ICurrentAdmin,
	) {
		const lang = (req.headers["lang"] || "en") as string;

		return this.categoryService.update(id, updateCategoryDto,lang, admin);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RolesDecorator(Roles.ADMIN, Roles.MANAGER)
	@Delete(":id")
	remove(@Req() req: Request, @Param("id", ParseIntPipe) id: number) {
		const lang = (req.headers["lang"] || "en") as string;

		return this.categoryService.delete(id,lang);
	}
}
