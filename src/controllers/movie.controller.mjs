import ValidationError from 'mongoose/lib/error/mongooseError.js';
import CastError from 'mongoose/lib/error/cast.js';
import MovieModel from '../models/movie.model.mjs';
import {
  CREATED_CODE,
  MOVIE_NOT_FOUND,
  NO_RIGHTS,
} from '../utils/constants.mjs';
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from '../utils/errors/index.mjs';

async function getMovies(request, response, next) {
  try {
    const movies = await MovieModel.find({ owner: request.user._id });
    response.send(movies);
  } catch (error) {
    next(error);
  }
}

async function createMovie(request, response, next) {
  try {
    let movie = new MovieModel({ ...request.body, owner: request.user._id });
    await movie.save();
    movie = await movie.populate('owner');
    response.status(CREATED_CODE).send(movie);
  } catch (error) {
    if (error instanceof ValidationError) {
      next(new BadRequestError(error.message));
    } else {
      next(error);
    }
  }
}
async function removeMovie(request, response, next) {
  try {
    const movie = await MovieModel.findById(request.params.id).populate(
      'owner',
    );
    if (movie === null) {
      throw new NotFoundError(MOVIE_NOT_FOUND);
    }
    if (movie.owner.id !== request.user._id) {
      throw new ForbiddenError(NO_RIGHTS);
    }
    await movie.delete();
    response.send(movie);
  } catch (error) {
    if (error instanceof CastError) {
      next(new BadRequestError(error.message));
    } else {
      next(error);
    }
  }
}

export default {
  getMovies,
  createMovie,
  removeMovie,
};
