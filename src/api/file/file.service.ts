import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FileEntity } from "src/core/entity/file.entity";
import { FileRepository } from "src/core/repository/file.repository";
import { BaseService } from "src/infrastructure/lib/baseService";
import { CreateFileDto } from "./dto/create-file.dto";
import { UpdateFileDto } from "./dto/update-file.dto";

@Injectable()
export class FileService
	extends BaseService<CreateFileDto, UpdateFileDto, FileEntity>
{
	constructor(
		@InjectRepository(FileEntity)
		repository: FileRepository,
	) {
		super(repository, "File");
	}
}
