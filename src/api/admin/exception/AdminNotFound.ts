import { HttpException } from "@nestjs/common";
import { getErrorMessage } from "src/infrastructure/lib/prompts/errorPrompt";

export class AdminNotFound extends HttpException {
	constructor() {
		super(JSON.stringify(getErrorMessage("application", "admin_not_found")), 400);
	}
}
