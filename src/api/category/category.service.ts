import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { extend } from "fp-ts/lib/pipeable";
import { ICurrentAdmin } from "src/common/interface/current-admin.interface";
import { CategoryEntity } from "src/core/entity/category.entity";
import { CategoryRepository } from "src/core/repository/category.repository";
import { BaseService } from "src/infrastructure/lib/baseService";
import { getDateInNumber } from "src/infrastructure/lib/getDateByTimeZone";
import { returnResponseMessage } from "src/infrastructure/lib/prompts/successResponsePrompt";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoryService extends BaseService<
	CreateCategoryDto,
	UpdateCategoryDto,
	CategoryEntity
> {
	constructor(@InjectRepository(CategoryEntity) repository: CategoryRepository) {
		super(repository, "Category");
	}
	async update(id: number, dto: UpdateCategoryDto, lang: string = "en", admin: ICurrentAdmin) {
		await this.findOneById(id);
		const currentDateInNumber = getDateInNumber();
		console.log(admin, dto);

		const result = await this.getRepository.update(id, {
			...dto,
			updatedBy: admin,
			updatedAt: currentDateInNumber,
		});
		const responseMessages = [
			`Charity was updated`,
			`Charity был обновилась!`,
			`Charity yangilandi!`,
		];
		const message = returnResponseMessage(responseMessages, lang);
		return { data: result, status: 200, message };
	}
}
