import * as dotenv from "dotenv";

dotenv.config();

export type ConfigType = {
	PORT: number;
	DB_URL: string;
	JWT_SECRET_KEY: string;
	NODE_ENV: string;
	APP_LOGS_PATH: string;
	OPERATION_LOGS_PATH: string;
	FILE_SIZE: number;
	PATH_FOR_FILE_UPLOAD: string;
};

export const config: ConfigType = {
	PORT: process.env.PORT as unknown as number,
	DB_URL: process.env.DB_URL as unknown as string,
	JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as unknown as string,
	NODE_ENV: process.env.NODE_ENV as unknown as string,
	APP_LOGS_PATH: process.env.APP_LOGS_PATH as unknown as string,
	OPERATION_LOGS_PATH: process.env.OPERATION_LOGS_PATH as unknown as string,
	FILE_SIZE: process.env.FILE_SIZE as unknown as number,
	PATH_FOR_FILE_UPLOAD: process.env.PATH_FOR_FILE_UPLOAD as unknown as string,
};
