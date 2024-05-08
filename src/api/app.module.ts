import { TypeOrmModule } from "@nestjs/typeorm";

import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ScheduleModule as NestScheduleModule } from "@nestjs/schedule";

import { CorrelatorMiddleware } from "../infrastructure/middleware/correlator";
import { config } from "src/config";
import { AuthModule } from "./auth/AuthModule";

import { AdminModule } from "./admin/admin.module";
import { FileModule } from "./file/file.module";
import { CategoryModule } from './category/category.module';
import { CharityModule } from './charity/charity.module';
import { QuestionAnswerModule } from './question-answer/question-answer.module';

@Module({
	imports: [
		AuthModule,
		TypeOrmModule.forRoot({
			type: "postgres",
			url: "postgres://postgres:8017@db:5432/tech",
			entities: ["dist/core/entity/*.entity{.ts,.js}"],
			synchronize: true, // TODO: set to false in production
		}),
		NestScheduleModule.forRoot(),
		AdminModule,
		FileModule,
		CategoryModule,
		CharityModule,
		QuestionAnswerModule,
		
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(CorrelatorMiddleware).forRoutes("*");
	}
}
