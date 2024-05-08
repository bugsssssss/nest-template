import { SuccessResponsePrompt } from "./types";

export const SUCCESS_RESPONSE_PROMPT_MAP = {
	application: {
		authorization_error: {
			id: 9999,
			status: "AUTH ERROR",
			code: "ADMIN",
			labels: ["Auth error!", "Ошибка авторизации!", "Auth error!"],
		},
	},
};

type SuccessResponsePromptMap = {
	[K1 in keyof typeof SUCCESS_RESPONSE_PROMPT_MAP]: {
		[K2 in keyof (typeof SUCCESS_RESPONSE_PROMPT_MAP)[K1]]: SuccessResponsePrompt;
	};
};

export interface SuccessResponsePromptDataType {
	[key: string]: SuccessResponsePrompt;
}

const PromptsMap: SuccessResponsePromptMap = <SuccessResponsePromptMap>SUCCESS_RESPONSE_PROMPT_MAP;

export function getErrorMessage<
	K1 extends keyof SuccessResponsePromptMap,
	K2 extends keyof SuccessResponsePromptMap[K1],
>(origin: K1, condition: K2): SuccessResponsePrompt {
	return PromptsMap[origin][condition];
}

export function parseIfItsPrompt(error: unknown) {
	console.log(error);
}

export function returnResponseMessage(labels: string[], lang: string) {
	let message = "";

	switch (lang) {
		case "en":
			message = labels[0];
			break;
		case "ru":
			message = labels[1];
			break;
		case "uz":
			message = labels[2];
			break;
		default:
			message = "Success Response";
	}
	return message;
}
