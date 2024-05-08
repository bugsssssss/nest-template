import { BaseEntity } from "src/common/database/BaseEntity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { CategoryEntity } from "./category.entity";
import { FileEntity } from "./file.entity";
@Entity("charities")
export class CharityEntity extends BaseEntity {
	@Column({ name: "title_uz", type: "varchar" })
	titleUz!: string;
	@Column({ name: "title_ru", type: "varchar" })
	titleRu!: string;
	@Column({ name: "title_en", type: "varchar" })
	titleEn!: string;

	@Column({ name: "info_uz", type: "varchar" })
	infoUz!: string;
	@Column({ name: "info_ru", type: "varchar" })
	infoRu!: string;
	@Column({ name: "info_en", type: "varchar" })
	infoEn!: string;

	@ManyToOne(() => FileEntity, (file) => file.charities, { onDelete: "CASCADE" })
	@JoinColumn({ name: "file_id" })
	file!: FileEntity;

	@ManyToOne(() => CategoryEntity, (category) => category.charities, { onDelete: "CASCADE" })
	@JoinColumn({ name: "category_id" })
	category!: CategoryEntity;
}
