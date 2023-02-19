import { Router } from 'express';
import auth from '../middlewares/auth.middleware.mjs';
import { PAGE_NOT_FOUND } from '../utils/constants.mjs';
import NotFoundError from '../utils/errors/NotFoundError.mjs';
import authRouter from './auth.router.mjs';
import userRouter from './user.router.mjs';
import movieRouter from './movie.router.mjs';

const router = Router();

router.use('', authRouter);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', auth, movieRouter);
router.use('*', (req, res, next) => next(new NotFoundError(PAGE_NOT_FOUND)));

export default router;
