import * as fs from "fs";
import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Inject,
	UseInterceptors,
	UploadedFile,
	UseGuards,
	Req,
} from "@nestjs/common";
import { FileService } from "./file.service";
import { CreateFileApiDto, CreateFileDto } from "./dto/create-file.dto";
import { UpdateFileDto } from "./dto/update-file.dto";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerImageUpload } from "src/infrastructure/lib/fileService";
import { config } from "src/config";
import { FileRequiredException } from "./exception/file.exception";
import { FileEntity } from "src/core/entity/file.entity";
import { JwtAuthGuard } from "../auth/user/AuthGuard";
import { RolesGuard } from "../auth/roles/RoleGuard";
import { RolesDecorator } from "../auth/roles/RolesDecorator";
import { Roles } from "src/common/database/Enums";
import { join } from "path";
import { Request } from "express";
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags("file")
@Controller("file")
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@RolesDecorator(Roles.ADMIN)
	@Post()
	@ApiConsumes("multipart/form-data")
	@ApiBody({ type: CreateFileApiDto })
	@UseInterceptors(FileInterceptor("file", multerImageUpload))
	async create(@UploadedFile() file: Express.Multer.File, @Body() createFileDto: CreateFileDto) {
		if (!file) {
			throw new FileRequiredException();
		}
		const newFile = new FileEntity();

		newFile.fileName = createFileDto.fileName || file.originalname;
		newFile.path = `${file.filename}`;
		newFile.mimeType = file.mimetype;
		newFile.size = file.size;

		const data = await this.fileService.getRepository.save(newFile);
		return { data, status: 201, message: "File successfully created" };
	}

	@RolesDecorator(Roles.ADMIN)
	@Get()
	async findAll(@Req() req: Request) {
		const lang = (req.headers["lang"] || "en") as string;
		return await this.fileService.findAll(lang, { order: { id: "DESC" } });
	}

	@RolesDecorator(Roles.ADMIN)
	@Get(":id")
	async findOne(@Param("id") id: number) {
		return await this.fileService.findOneById(id);
	}

	@RolesDecorator(Roles.ADMIN)
	@Delete(":id")
	async delete(@Param("id") id: number) {
		const { data: founFile } = await this.findOne(id);
		const filePath = join(__dirname, "../../../../uploads", founFile.path);
		// Check if the file exists
		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath);
		}

		return await this.fileService.delete(id);
	}
}
