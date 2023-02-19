import { NOT_FOUND_ERR_CODE } from '../constants.mjs';
import HttpError from './HttpError.mjs';

export default class NotFoundError extends HttpError {
  constructor(message) {
    super(NOT_FOUND_ERR_CODE, message);
    this.name = 'NotFoundError';
  }
}
