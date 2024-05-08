import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "src/core/entity/admin.entity";
import { JwtStrategy } from "./user/AuthStrategy";



@Module({
	imports: [TypeOrmModule.forFeature([AdminEntity])],
	providers: [JwtStrategy],
})
export class AuthModule {}
