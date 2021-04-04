import { DeleteResult, getRepository, Repository } from 'typeorm';

import Developer from '../../models/Developer';
import IDevelopersRepository from '../interfaces/IDevelopersRepository';

export interface ICreate {
  dataNascimento: Date;
  hobby: string;
  id?: number;
  idade: number;
  nome: string;
  sexo: string;
}

export type IFind = {
  filter?: string;
  limit?: number;
  page?: number;
};

export interface IFindReturn {
  content: Developer[];
  hasMore: boolean;
}

class DevelopersRepository implements IDevelopersRepository {
  private ormRepository: Repository<Developer>;

  public getRepository(): DevelopersRepository {
    this.ormRepository = getRepository(Developer, process.env.POSTGRES_NAME);

    return this;
  }

  public async findAllOrFiltered({
    filter,
    limit = 16,
    page = 0,
  }: IFind): Promise<IFindReturn> {
    let developers;

    if (filter) {
      developers = await this.ormRepository.find({
        where: { nome: filter },
        order: {
          id: 'ASC',
        },
        skip: limit * page,
        take: limit,
      });
    } else {
      developers = await this.ormRepository.find({
        order: {
          id: 'ASC',
        },
        skip: limit * page,
        take: limit,
      });
    }

    return { content: developers, hasMore: developers.length === limit };
  }

  public async findOne(id: number): Promise<Developer | undefined> {
    const developer = await this.ormRepository.findOne(id);

    return developer;
  }

  public async create({
    dataNascimento,
    hobby,
    idade,
    nome,
    sexo,
  }: ICreate): Promise<Developer | undefined> {
    const developerSaved = this.ormRepository.create({
      dataNascimento,
      hobby,
      idade,
      nome,
      sexo,
    });

    await this.ormRepository.save(developerSaved);

    return developerSaved;
  }

  public async update({
    dataNascimento,
    hobby,
    id,
    idade,
    nome,
    sexo,
  }: ICreate): Promise<Developer | undefined> {
    return await this.ormRepository.save({
      dataNascimento,
      hobby,
      id,
      idade,
      nome,
      sexo,
    });
  }

  public async delete(id: number): Promise<DeleteResult> {
    return await this.ormRepository.delete(id);
  }
}

export default new DevelopersRepository();
