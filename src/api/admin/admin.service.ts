import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Roles } from "src/common/database/Enums";
import { AdminEntity } from "src/core/entity/admin.entity";
import { AdminRepository } from "src/core/repository/admin.repository";
import { BaseService } from "src/infrastructure/lib/baseService";
import { BcryptEncryption } from "src/infrastructure/lib/bcrypt";
import { IAdminService } from "./admin.interface";
import { CreateAdminDto, CreateAdminDtoWithRole } from "./dto/create-admin.dto";
import { LoginDto } from "./dto/login-dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { UsernameOrPasswordIncorrect } from "./exception/username-or-password-incorrect.exception.ts";
import { QueryFailedError, TypeORMError } from "typeorm";
import { AdminNotFound } from "./exception/AdminNotFound";
import { IFindOptions, IResponse } from "src/infrastructure/lib/baseService/interface";
import { ICurrentAdmin } from "src/common/interface/current-admin.interface";
import { DefaultRelationObj } from "src/common/type";
import { getDateInNumber } from "src/infrastructure/lib/getDateByTimeZone";
@Injectable()
// extends BaseService<CreateAdminDto, UpdateAdminDto, AdminEntity>
export class AdminService implements IAdminService {
	constructor(
		@InjectRepository(AdminEntity) private readonly repository: AdminRepository,
		private jwtService: JwtService,
	) {}
	async findOneById(id: number, options?: IFindOptions<AdminEntity> | undefined) {
		const foundAdmin = await this.repository.findOne({
			where: { id, isDeleted: false },
			relations: { ...DefaultRelationObj },
		});
		if (!foundAdmin) {
			throw new AdminNotFound();
		}
		return { data: foundAdmin, status: 200, message: "ok" };
	}

	async findAllAdminsBySuperAdmin() {
		const admins = await this.repository
			.createQueryBuilder("admin")
			.where("admin.role != :superAdmin", { superAdmin: Roles.ADMIN })
			.andWhere("admin.is_deleted = :isDeleted", { isDeleted: false })
			.orderBy("admin.id", "DESC")
			.getMany();
		return { data: admins, status: 200, message: "all admins" };
	}
	async createSuperAdmin(dto: CreateAdminDto) {
		const hashshedPassword = await BcryptEncryption.encrypt(dto.password);
		const newSuperAdmin = await this.repository.save(
			this.repository.create({
				fullName: dto.fullName,
				username: dto.username,
				password: hashshedPassword,
				phoneNumber: dto.phoneNumber,
				role: Roles.ADMIN,
			}),
		);

		return { data: newSuperAdmin, status: 201, message: "success" };
	}

	async createAdmin(admin: ICurrentAdmin, dto: CreateAdminDtoWithRole) {
		const hashshedPassword = await BcryptEncryption.encrypt(dto.password);

		const newAdmin = await this.repository.save(
			this.repository.create({
				fullName: dto.fullName,
				username: dto.username,
				password: hashshedPassword,
				phoneNumber: dto.phoneNumber,
				role: dto.role,
				createdBy: admin,
			}),
		);
		return { data: newAdmin, status: 201, message: "succes" };
	}
	async login(dto: LoginDto) {
		const admin = await this.repository.findOne({
			where: { username: dto.username },
		});

		if (!admin) {
			throw new UsernameOrPasswordIncorrect();
		}
		const compare = await BcryptEncryption.compare(dto.password, admin.password);
		if (!compare) {
			throw new UsernameOrPasswordIncorrect();
		}

		const payload = { id: admin.id, role: admin.role };
		return {
			access_token: await this.jwtService.signAsync(payload),
			data: admin,
			status: 200,
			message: "successfully logged in",
		};
	}
	async update(id: number, admin: ICurrentAdmin, dto: UpdateAdminDto) {
		let foundAdmin = await this.repository.findOne({ where: { id } });
		if (!foundAdmin) {
			throw new AdminNotFound();
		}
		if (dto.password) {
			const hashedPassword = await BcryptEncryption.encrypt(dto.password);
			dto.password = hashedPassword;
		}
		const currentDateInNumber = getDateInNumber();

		await this.repository.update(id, {
			...dto,
			updatedBy: admin,
			updatedAt: currentDateInNumber,
		});

		return { data: {}, status: 200, message: "admin details updated" };
	}
	async delete(id: number, admin: ICurrentAdmin): Promise<IResponse<{}>> {
		let foundAdmin = await this.repository.findOne({ where: { id } });
		if (!foundAdmin) {
			throw new AdminNotFound();
		}
		const currentDateInNumber = getDateInNumber();

		await this.repository.update(id, {
			deletedBy: admin,
			isActive: false,
			isDeleted: true,
			deletedAt: currentDateInNumber,
		});

		return { data: {}, status: 200, message: "admin deleted" };
	}
}
