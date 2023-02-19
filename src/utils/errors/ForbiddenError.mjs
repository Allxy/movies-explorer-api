import { FORBIDDEN_ERR_CODE } from '../constants.mjs';
import HttpError from './HttpError.mjs';

export default class ForbiddenError extends HttpError {
  constructor(message) {
    super(FORBIDDEN_ERR_CODE, message);
    this.name = 'ForbiddenError';
  }
}
