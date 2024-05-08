import momentTz from "moment-timezone";

export function getDateInNumber() {
	let date = new Date();

	let result = momentTz(date).tz("Asia/Tashkent").valueOf();

	return result;
}
