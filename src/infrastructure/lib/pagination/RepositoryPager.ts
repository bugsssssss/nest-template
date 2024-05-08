import { FindManyOptions, ObjectLiteral, Repository } from "typeorm";

import { Pager, PagerWithTotalPrice } from "./Pager";
import { findAllCustomQueryOptions, Page } from "./Page";
import { IFindOptions, IResponsePagination } from "src/infrastructure/lib/baseService/interface";

export class RepositoryPager {
	public static readonly DEFAULT_PAGE = 1;
	public static readonly DEFAULT_PAGE_SIZE = 10;

	public static async findAll<T extends ObjectLiteral>(
		repo: Repository<T>,
		message: string,
		options?: IFindOptions<T>,
	): Promise<IResponsePagination<T>> {
		const [data, count] = await repo.findAndCount(RepositoryPager.normalizePagination(options));
		return Pager.of(
			data,
			count,
			options?.take ?? this.DEFAULT_PAGE_SIZE,
			options?.skip ?? this.DEFAULT_PAGE,
			200,
			message,
		);
	}

	public static async findAllWithTotalPrice<T extends ObjectLiteral>(
		repo: Repository<T>,
		totalPrice: number,
		options?: IFindOptions<T>,
	): Promise<IResponsePagination<T>> {
		const [data, count] = await repo.findAndCount(RepositoryPager.normalizePagination(options));
		return PagerWithTotalPrice.of(
			data,
			count,
			totalPrice,
			options?.take ?? this.DEFAULT_PAGE_SIZE,
			options?.skip ?? this.DEFAULT_PAGE,
			200,
			"ok",
		);
	}

	private static normalizePagination<T>(options?: IFindOptions<T>): FindManyOptions<T> {
		let page = (options?.skip ?? RepositoryPager.DEFAULT_PAGE) - 1; // pagination is 1 indexed, convert into 0 indexed
		return {
			...options,
			take: options?.take,
			skip: page * (options?.take ?? RepositoryPager.DEFAULT_PAGE_SIZE),
		};
	}
}
