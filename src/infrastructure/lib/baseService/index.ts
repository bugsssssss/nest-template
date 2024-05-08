import { HttpException, Logger } from "@nestjs/common";
import { isArray } from "class-validator";
import { BaseEntity } from "src/common/database/BaseEntity";
import { DeleteResult, Repository } from "typeorm";
import { IFindOptions, IResponse, IResponsePagination } from "./interface";
import { ID } from "../../../common/type/index";
import { RepositoryPager } from "../pagination";
import { ICurrentAdmin } from "src/common/interface/current-admin.interface";
import { getDateInNumber } from "../getDateByTimeZone";
import { returnResponseMessage } from "../prompts/successResponsePrompt";

export class BaseService<CreateDto, UpdateDto, Entity> {
	constructor(
		private readonly repository: Repository<any>,
		private readonly entityName: string,
	) {}

	get getRepository() {
		return this.repository;
	}

	async create(
		dto: CreateDto,
		lang: string = "en",
		admin?: ICurrentAdmin,
	): Promise<IResponse<Entity>> {
		let createdData = this.repository.create({
			...dto,
			createdBy: admin,
		}) as unknown as Entity;
		createdData = await this.repository.save(createdData);

		const responseMessages = [
			`${this.entityName} created succesfully`,
			`${this.entityName} успешно создан`,
			`${this.entityName} muvaffaqiyatli yaratildi`,
		];
		const message = returnResponseMessage(responseMessages, lang);
		return {
			data: createdData,
			status: 201,
			message,
		};
	}

	async findAll(
		lang: string = "en",
		options?: IFindOptions<Entity>,
	): Promise<IResponse<Entity[]>> {
		const data = (await this.repository.find({
			...options,
			where: { isDeleted: false },
		})) as Entity[];

		const responseMessages = [
			`List of ${this.entityName}`,
			`Список ${this.entityName}`,
			`${this.entityName} lar ro'yxati`,
		];
		const message = returnResponseMessage(responseMessages, lang);
		return {
			data: data,
			status: 200,
			message,
		};
	}
	async findAllWithPagination(
		lang: string = "en",
		options?: IFindOptions<Entity>,
	): Promise<IResponsePagination<Entity>> {
		const responseMessages = [
			`List of ${this.entityName}`,
			`Список ${this.entityName}`,
			`${this.entityName} lar ro'yxati`,
		];
		const message = returnResponseMessage(responseMessages, lang);
		return await RepositoryPager.findAll(this.getRepository, message, options);
	}

	async findOneBy(
		lang: string = "en",
		options: IFindOptions<Entity>,
	): Promise<IResponse<Entity>> {
		const data = (await this.repository.findOne({
			select: options.select || {},
			relations: options.relations || [],
			where: options.where,
		})) as Entity;
		const responseMessages = [
			`${this.entityName} `,
			`${this.entityName} `,
			`${this.entityName} `,
		];
		const message = returnResponseMessage(responseMessages, lang);
		return {
			data: data,
			status: 200,
			message,
		};
	}

	async findOneById(
		id: ID,
		lang: string = "en",
		options?: IFindOptions<Entity>,
	): Promise<IResponse<Entity>> {
		const data = (await this.repository.findOne({
			select: options?.select || {},
			relations: options?.relations || [],
			where: { id, ...options?.where, isDeleted: false },
		})) as unknown as Entity;

		if (!data) {
			const errorData = {
				message: [
					`${this.entityName} Not found`,
					`${this.entityName} не найден`,
					`${this.entityName} topilmadi`,
				],
				status: 404,
			};

			Logger.error({
				message: errorData.message,
				status: errorData.status,
				user: "none",
				stack: errorData,
				context: `${BaseService.name}  function findOneById `,
			});

			throw new HttpException(errorData.message, errorData.status);
		}
		const responseMessages = [
			`${this.entityName} en`,
			`${this.entityName} ru `,
			`${this.entityName} uz`,
		];
		const message = returnResponseMessage(responseMessages, lang);
		return {
			data,
			status: 200,
			message,
		};
	}

	// async update(id: number, dto: UpdateDto) {
	// 	// let { data: foundData } = await this.findOneById(id);
	// 	const UpdateObject={...dto}
	// 	await this.repository.update(id, {...dto});

	// 	return { data: {}, status: 200, message: "admin details updated" };
	// }

	async disactive(id: ID, lang: string = "en"): Promise<IResponse<Entity>> {
		await this.findOneById(id);

		const data = (await this.repository.update(
			{ id },
			{ isActive: false },
		)) as unknown as Entity;
		const responseMessages = [
			`${this.entityName} was deactivated`,
			`${this.entityName} был деактивирован`,
			`${this.entityName} faolsizlantirildi`,
		];
		const message = returnResponseMessage(responseMessages, lang);
		return {
			data,
			status: 200,
			message,
		};
	}

	async delete(id: ID, lang: string = "en", admin?: ICurrentAdmin): Promise<IResponse<Entity>> {
		await this.findOneById(id);
		const currentDateInNumber = getDateInNumber();
		const data = (await this.repository.update(
			{ id },
			{
				isDeleted: true,
				isActive: false,
				deletedAt: currentDateInNumber,
				deletedBy: admin,
			},
		)) as unknown as Entity;
		const responseMessages = [
			`${this.entityName} was deleted`,
			`${this.entityName} был удален`,
			`${this.entityName} o'chirildi`,
		];
		const message = returnResponseMessage(responseMessages, lang);

		return {
			data,
			status: 200,
			message,
		};
	}

	async deepDelete(ids: ID[]): Promise<IResponse<DeleteResult>> {
		const data = await this.repository.delete(ids);

		return {
			data,
			status: 200,
			message: [
				`${this.entityName} was hard deleted`,
				`${this.entityName} был удален`,
				`${this.entityName} o'chirildi`,
			],
		};
	}
}
