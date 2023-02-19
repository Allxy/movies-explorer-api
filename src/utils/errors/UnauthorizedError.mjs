import { UNAUTHORIZED_ERR_CODE } from '../constants.mjs';
import HttpError from './HttpError.mjs';

export default class UnauthorizedError extends HttpError {
  constructor(message) {
    super(UNAUTHORIZED_ERR_CODE, message);
    this.name = 'UnauthorizedError';
  }
}
