import { DeleteResult } from 'typeorm';

import Developer from '../../models/Developer';
import {
  ICreate,
  IFind,
  IFindReturn,
} from '../repositories/DevelopersRepository';

export default interface IDevelopersRepository {
  getRepository(): IDevelopersRepository;
  findAllOrFiltered({ limit, page }: IFind): Promise<IFindReturn>;
  findOne(id: number): Promise<Developer | undefined>;
  create(developer: Developer): Promise<Developer | undefined>;
  update({
    dataNascimento,
    hobby,
    id,
    idade,
    nome,
    sexo,
  }: ICreate): Promise<Developer | undefined>;
  delete(id: number): Promise<DeleteResult>;
}
