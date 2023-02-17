import { INTERNAL_SERVER_ERR_CODE } from '../constants.mjs';
import HttpError from './HttpError.mjs';

export default class InternalServerError extends HttpError {
  constructor(message) {
    super(INTERNAL_SERVER_ERR_CODE, message);
    this.name = 'InternalServerError';
  }
}
