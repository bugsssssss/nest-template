import {
	IResponsePagination,
	IResponsePaginationWithTotalPrice,
} from "src/infrastructure/lib/baseService/interface";

export class Pager<T> {
	public static of<T>(
		data: Array<T>,
		totalElements: number,
		pageSize: number,
		currentPage: number,
		status: number,
		message: string,
	): IResponsePagination<T> {
		return new Pager(
			data,
			totalElements,
			Math.ceil(totalElements / pageSize),
			pageSize,
			currentPage,
			status,
			message,
		).toPage();
	}
	
	private constructor(
		private data: Array<T>,
		private totalElements: number,
		private totalPages: number,
		private pageSize: number,
		private currentPage: number,
		private status: number,
		private message: string,
	) {}

	public toPage(): IResponsePagination<T> {
		return {
			data: this.data,
			total_elements: this.totalElements,
			total_pages: this.totalPages,
			page_size: this.pageSize,
			current_page: this.currentPage,
			status: this.status,
			message: this.message,
		};
	}
	
}

// with total price
export class PagerWithTotalPrice<T> {
	public static of<T>(
		data: Array<T>,
		totalElements: number,
		totalPrice: number,
		pageSize: number,
		currentPage: number,
		status: number,
		message: string,
	): IResponsePaginationWithTotalPrice<T> {
		return new PagerWithTotalPrice(
			data,
			totalElements,
			totalPrice,
			Math.ceil(totalElements / pageSize),
			pageSize,
			currentPage,
			status,
			message,
		).toPage();
	}

	private constructor(
		private data: Array<T>,
		private totalElements: number,
		private totalPrice: number,
		private totalPages: number,
		private pageSize: number,
		private currentPage: number,
		private status: number,
		private message: string,
	) {}

	public toPage(): IResponsePaginationWithTotalPrice<T> {
		return {
			data: this.data,
			total_elements: this.totalElements,
			total_price: this.totalPrice,
			total_pages: this.totalPages,
			page_size: this.pageSize,
			current_page: this.currentPage,
			status: this.status,
			message: this.message,
		};
	}
}
