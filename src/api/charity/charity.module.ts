import { Module } from "@nestjs/common";
import { CharityService } from "./charity.service";
import { CharityController } from "./charity.controller";
import { CharityEntity } from "src/core/entity/charity.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "src/core/entity/category.entity";
import { FileEntity } from "src/core/entity/file.entity";
import { FileService } from "../file/file.service";
import { CategoryService } from "../category/category.service";

@Module({
	imports: [TypeOrmModule.forFeature([CharityEntity, FileEntity, CategoryEntity])],
	controllers: [CharityController],
	providers: [CharityService, FileService, CategoryService],
})
export class CharityModule {}
