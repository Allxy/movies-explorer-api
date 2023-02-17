import CastError from 'mongoose/lib/error/cast.js';
import MongooseError from 'mongoose/lib/error/mongooseError.js';
import UserModel from '../models/user.model.mjs';
import { USER_NOT_FOUND } from '../utils/constants.mjs';
import { BadRequestError, NotFoundError } from '../utils/errors/index.mjs';

async function getMe(request, response, next) {
  try {
    const user = await UserModel.findById(request.user._id);
    if (user === null) {
      throw new NotFoundError(USER_NOT_FOUND);
    }
    response.send(user);
  } catch (error) {
    if (error instanceof CastError) {
      next(new BadRequestError(error.message));
    } else {
      next(error);
    }
  }
}

async function updateUser(request, response, next) {
  try {
    const { name, email } = request.body;

    const user = await UserModel.findByIdAndUpdate(
      request.user._id,
      { name, email },
      {
        new: true,
        runValidators: true,
      },
    );
    if (user === null) {
      throw new NotFoundError(USER_NOT_FOUND);
    }
    response.send(user);
  } catch (error) {
    if (error instanceof MongooseError) {
      next(new BadRequestError(error.message));
    } else {
      next(error);
    }
  }
}

export default {
  updateUser,
  getMe,
};
