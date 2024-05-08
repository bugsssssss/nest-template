import { BaseEntity } from "src/common/database/BaseEntity";
import { Roles } from "src/common/database/Enums";
import { Column, Entity, OneToMany } from "typeorm";

@Entity("admins")
export class AdminEntity extends BaseEntity {
	@Column({ type: "varchar", name: "full_name" })
	fullName!: string;

	@Column({ type: "varchar", name: "role" })
	role!: Roles;

	@Column({ type: "varchar", name: "username", unique: true })
	username!: string;

	@Column({ type: "varchar", name: "password" })
	password!: string;

	@Column({ type: "varchar", name: "phone_number",unique:true })
	phoneNumber!: string;
}
