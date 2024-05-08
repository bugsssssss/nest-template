import { Repository } from "typeorm";
import { Page } from "../../infrastructure/lib/pagination";
import { IFindOptions, IResponse } from "../../infrastructure/lib/baseService/interface";
import { ICurrentAdmin } from "./current-admin.interface";

/**
 * CrudService contains basic CRUD operations.
 */
export interface IBaseService<CDTO, UDTO, T> {
	//  Direct connection to the database
	get getRepository(): Repository<any>;

	//  Get entities from the database.
	findAll(options?: IFindOptions<T>): Promise<IResponse<T[]>>;

	//  Get paginated entities from the database.
	findAllWithPagination(options?: IFindOptions<T>): Promise<Page<T>>;

	//  Get paginated entities from the database.
	findAllWithTotalPricePagination(
		totalPrice: number,
		options?: IFindOptions<T>,
	): Promise<Page<T>>;

	//  Get a single entity from the database.
	findOneById(id: number, options?: IFindOptions<T>): Promise<IResponse<T>>;

	//  Get a single entity from the database
	findOneBy(options?: IFindOptions<T>): Promise<IResponse<T>>;

	//  Create entity in the database.
	create(dto: CDTO, admin?: ICurrentAdmin): Promise<IResponse<T>>;

	//  Update existing entity in the database by id.
	update(id: number, dto: UDTO, admin?: ICurrentAdmin): Promise<IResponse<{}>>;

	//  Delete entity by id.
	delete(id: number, admin?: ICurrentAdmin): Promise<IResponse<{}>>;
}
