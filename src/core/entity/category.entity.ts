import { BaseEntity } from "src/common/database/BaseEntity";
import { Column, Entity, OneToMany } from "typeorm";
import { CharityEntity } from "./charity.entity";

@Entity("categories")
export class CategoryEntity extends BaseEntity {
	@Column({ name: "name_uz", type: "varchar" })
	nameUz!: string;

	@Column({ name: "name_ru", type: "varchar" })
	nameRu!: string;

	@Column({ name: "name_en", type: "varchar" })
	nameEn!: string;

	@OneToMany(() => CharityEntity, (charity) => charity.category)
	charities!: CharityEntity[];
}
