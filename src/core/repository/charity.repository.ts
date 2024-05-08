import { Repository } from 'typeorm';
import { CharityEntity } from '../entity/charity.entity';

export type CharityRepository = Repository<CharityEntity>;
