import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

import { AdminEntity } from "src/core/entity/admin.entity";

@Entity()
export class BaseEntity {
	@PrimaryGeneratedColumn({ type: "int" })
	id!: number;

	@Column({
		name: "is_active",
		type: "boolean",
		nullable: false,
		default: true,
	})
	isActive!: boolean;

	@Column({
		name: "is_deleted",
		type: "boolean",
		nullable: false,
		default: false,
	})
	isDeleted!: boolean;

	@Column({
		name: "created_at",
		type: "bigint",
		default: Date.now(),
	})
	createdAt!: number;

	@Column({
		name: "updated_at",
		type: "bigint",
		default: Date.now(),
	})
	updatedAt!: number;

	@Column({ name: "deleted_at", type: "bigint", nullable: true })
	deletedAt!: number;

	@ManyToOne(() => AdminEntity, (admin) => admin.id, {
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "created_by" })
	createdBy!: AdminEntity;

	@ManyToOne(() => AdminEntity, (admin) => admin.id, {
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "updated_by" })
	updatedBy!: AdminEntity;

	@ManyToOne(() => AdminEntity, (admin) => admin.id, {
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "deleted_by" })
	deletedBy!: AdminEntity;
}
