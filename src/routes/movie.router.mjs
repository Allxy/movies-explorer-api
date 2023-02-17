import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import MovieController from '../controllers/movie.controller.mjs';

const router = Router();

router.get('', MovieController.getMovies);
router.post(
  '',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().uri({ scheme: ['http', 'https'] }),
      trailerLink: Joi.string().uri({ scheme: ['http', 'https'] }),
      thumbnail: Joi.string().uri({ scheme: ['http', 'https'] }),
      owner: Joi.string().length(24).hex(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      movieId: Joi.string().required(),
    }),
  }),
  MovieController.createMovie,
);
router.delete(
  '/:id',
  celebrate({
    params: {
      id: Joi.string().length(24).hex(),
    },
  }),
  MovieController.removeMovie,
);

export default router;
