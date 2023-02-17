import { BAD_REQUEST_ERR_CODE } from '../constants.mjs';
import HttpError from './HttpError.mjs';

export default class BadRequestError extends HttpError {
  constructor(message) {
    super(BAD_REQUEST_ERR_CODE, message);
    this.name = 'BadRequestError';
  }
}
