import { Request, Response } from 'express';

import { validateRequestCreateAndUpdate } from '../shared/utils/validateRequestCreateAndUpdate';

import DevelopersRepository from '../shared/repositories/DevelopersRepository';

export default class DevController {
  public static async findAllOrFiltered(req: Request, res: Response) {
    const { page, filter } = req.query;

    try {
      const developers = await DevelopersRepository.getRepository().findAllOrFiltered(
        {
          filter: filter as string | undefined,
          page: Number(page),
        }
      );

      if (!developers.content.length)
        return res.status(400).send('Nenhum dado encontrado!');

      return res.status(200).json(developers);
    } catch (e) {
      throw new Error(e);
    }
  }

  public static async findOne(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const developers = await DevelopersRepository.getRepository().findOne(
        Number(id)
      );

      if (!developers) return res.status(400);

      return res.status(200).json(developers);
    } catch (e) {
      throw new Error(e);
    }
  }

  public static async create(req: Request, res: Response) {
    const { dataNascimento, hobby, idade, nome, sexo } = req.body;

    const validate = validateRequestCreateAndUpdate(
      dataNascimento,
      idade,
      sexo
    );

    if (validate) return res.status(400).send(validate);

    try {
      const developer = await DevelopersRepository.getRepository().create({
        dataNascimento,
        hobby,
        idade,
        nome,
        sexo,
      });

      if (!developer) return res.status(400);

      return res.status(201).json(developer);
    } catch (e) {
      throw new Error(e);
    }
  }

  public static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { dataNascimento, hobby, idade, nome, sexo } = req.body;

    const validate = validateRequestCreateAndUpdate(
      dataNascimento,
      idade,
      sexo
    );

    if (validate) return res.status(400).send(validate);

    try {
      const developer = await DevelopersRepository.getRepository().update({
        dataNascimento,
        hobby,
        id: Number(id),
        idade,
        nome,
        sexo,
      });

      console.log(developer);

      if (!developer) return res.status(400);

      return res.status(200).json(developer);
    } catch (e) {
      throw new Error(e);
    }
  }

  public static async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const developer = await DevelopersRepository.getRepository().delete(
        Number(id)
      );

      if (!developer.affected) return res.status(400);

      return res.status(204).json(developer);
    } catch (e) {
      throw new Error(e);
    }
  }
}
