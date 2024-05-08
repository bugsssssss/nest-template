import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "src/core/entity/admin.entity";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { config } from "src/config";

@Module({
	imports: [
		TypeOrmModule.forFeature([AdminEntity]),
		JwtModule.register({
			global: true,
			secret: config.JWT_SECRET_KEY || "12345",
			// signOptions: { expiresIn: "60s" },
		}),
	],
	controllers: [AdminController],
	providers: [AdminService],
})
export class AdminModule {}
