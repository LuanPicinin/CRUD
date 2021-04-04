import express from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import CreateOrGetConnection from './middlewares/CreateOrGetConnection';
import DevController from './controllers/DevController';

const routes = express.Router();

routes.get(
  '/developers',
  celebrate({
    [Segments.QUERY]: {
      filter: Joi.string().allow(''),
      page: Joi.number(),
    },
  }),
  CreateOrGetConnection,
  DevController.findAllOrFiltered
);

routes.get(
  '/developers/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().required() } }),
  CreateOrGetConnection,
  DevController.findOne
);

routes.post(
  '/developers',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      sexo: Joi.string().required(),
      idade: Joi.number().required(),
      hobby: Joi.string().required(),
      dataNascimento: Joi.string().required(),
    },
  }),
  CreateOrGetConnection,
  DevController.create
);

routes.put(
  '/developers/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().required() },
    [Segments.BODY]: {
      nome: Joi.string(),
      sexo: Joi.string(),
      idade: Joi.number(),
      hobby: Joi.string(),
      dataNascimento: Joi.string(),
    },
  }),
  CreateOrGetConnection,
  DevController.update
);

routes.delete(
  '/developers/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().required() } }),
  CreateOrGetConnection,
  DevController.delete
);

export default routes;
