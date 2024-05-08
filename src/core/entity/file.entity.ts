import { BaseEntity } from "src/common/database/BaseEntity";
import { Column, Entity, OneToMany } from "typeorm";
import { CharityEntity } from "./charity.entity";

@Entity("files")
export class FileEntity extends BaseEntity {
	@Column({ name: "file_name", type: "varchar" })
	fileName!: string;

	@Column({ name: "path", type: "varchar" })
	path!: string;

	@Column({ name: "size", type: "bigint" })
	size!: number;

	@Column({ name: "mime_type", type: "varchar" })
	mimeType!: string;

	@OneToMany(() => CharityEntity, (charity) => charity.file)
	charities!: CharityEntity[];
}
