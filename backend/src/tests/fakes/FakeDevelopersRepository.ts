import { IDeveloper } from 'shared/interfaces/IDeveloper';
import { ICreate, IFind } from 'shared/repositories/DevelopersRepository';

class FakeDevelopersRepository {
  private developers: IDeveloper[] = [
    {
      id: 1,
      nome: 'Luan',
      sexo: 'M',
      idade: 23,
      hobby: 'Jogar',
      dataNascimento: '03/09/1997',
    },
    {
      id: 2,
      nome: 'Luan',
      sexo: 'M',
      idade: 23,
      hobby: 'Jogar',
      dataNascimento: '03/09/1997',
    },
  ];

  public getRepository(): FakeDevelopersRepository {
    throw new Error('Not Implemented');
  }

  findAllOrFiltered({ filter }: IFind) {
    if (filter) {
      return this.developers.filter((x) => x.nome === filter);
    }

    return { content: this.developers, hasMore: false };
  }

  public async findOne(id: number) {
    return this.developers.filter((x) => x.id === id);
  }

  public async create({ dataNascimento, hobby, idade, nome, sexo }: ICreate) {
    this.developers.push({
      id: 3,
      dataNascimento: dataNascimento.toLocaleDateString(),
      hobby,
      idade,
      nome,
      sexo,
    });
  }

  public async update({
    dataNascimento,
    hobby,
    id,
    idade,
    nome,
    sexo,
  }: ICreate) {
    const findIndex = this.developers.findIndex((x) => x.id === id);

    this.developers[findIndex].id = id as number;

    this.developers.push({
      id: 3,
      dataNascimento: dataNascimento.toLocaleDateString(),
      hobby,
      idade,
      nome,
      sexo,
    });
  }
}

export default new FakeDevelopersRepository();
