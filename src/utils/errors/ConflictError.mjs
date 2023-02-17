import { CONFLICT_ERR_CODE } from '../constants.mjs';
import HttpError from './HttpError.mjs';

export default class ConflictError extends HttpError {
  constructor(message) {
    super(CONFLICT_ERR_CODE, message);
    this.name = 'ConflictError';
  }
}
