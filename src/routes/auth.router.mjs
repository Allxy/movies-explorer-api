import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import AuthController from '../controllers/auth.controller.mjs';

const router = Router();

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  AuthController.signin,
);

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  AuthController.signup,
);

export default router;
