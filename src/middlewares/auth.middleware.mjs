import jwt from 'jsonwebtoken';
import config from '../utils/config.mjs';
import {
  AUTH_REQUIRED,
  BAD_TOKEN,
  BAD_TOKEN_TYPE,
} from '../utils/constants.mjs';
import { UnauthorizedError } from '../utils/errors/index.mjs';

export default function auth(request, resource, next) {
  try {
    const { authorization } = request.headers;

    if (!authorization) {
      throw new UnauthorizedError(AUTH_REQUIRED);
    }

    if (!authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError(BAD_TOKEN_TYPE);
    }

    const token = authorization.replace('Bearer ', '');
    const payload = jwt.verify(token, config.JWT_KEY);

    request.user = payload;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new UnauthorizedError(BAD_TOKEN));
    } else {
      next(error);
    }
  }

  next();
}
