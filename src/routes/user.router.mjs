import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import UsersController from '../controllers/user.controller.mjs';

const router = Router();

router.get('/me', UsersController.getMe);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
}), UsersController.updateUser);

export default router;
