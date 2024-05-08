import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ICurrentAdmin } from "src/common/interface/current-admin.interface";
import { CharityEntity } from "src/core/entity/charity.entity";
import { CharityRepository } from "src/core/repository/charity.repository";
import { BaseService } from "src/infrastructure/lib/baseService";
import { getDateInNumber } from "src/infrastructure/lib/getDateByTimeZone";
import { returnResponseMessage } from "src/infrastructure/lib/prompts/successResponsePrompt";
import { CreateCharityDto } from "./dto/create-charity.dto";
import { UpdateCharityDto } from "./dto/update-charity.dto";

@Injectable()
export class CharityService extends BaseService<CreateCharityDto, UpdateCharityDto, CharityEntity> {
	constructor(@InjectRepository(CharityEntity) repository: CharityRepository) {
		super(repository, "Charity");
	}
	async update(id: number, dto: UpdateCharityDto, lang: string = "en", admin?: ICurrentAdmin) {
		await this.findOneById(id);
		const currentDateInNumber = getDateInNumber();

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
