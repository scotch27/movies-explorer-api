const Movie = require('../models/movie');
const BadRequestError = require('../utils/errors/badRequestError');
const NotFoundError = require('../utils/errors/notFoundError');
const ForbiddenError = require('../utils/errors/forbiddenError');
const {
  MSG_MOVIE_SUSSES_DELETED,
  ERR_MOVIE_ID_NOT_FOUND,
  ERR_MOVIE_NOT_OWNER_DELETED,
  ERR_MOVIE_INCORRECT_DATA,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  // Добавить сортировку
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => {
      throw new NotFoundError(ERR_MOVIE_ID_NOT_FOUND);
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(ERR_MOVIE_NOT_OWNER_DELETED);
      }
      Movie.deleteOne(movie)
        .then(() => res.send({ message: MSG_MOVIE_SUSSES_DELETED }))
        .catch(next);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new BadRequestError(ERR_MOVIE_INCORRECT_DATA));
      }
      return next(error);
    });
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const ownerId = req.user._id;
  Movie.findOne({ owner: ownerId, movieId })
    .then((movie) => {
      if (movie) {
        res.status(200).send(movie);
      } else {
        Movie.create({
          country,
          director,
          duration,
          year,
          description,
          image,
          trailerLink,
          nameRU,
          nameEN,
          thumbnail,
          movieId,
          owner: ownerId,
        })
          .then((mov) => res.status(201).send(mov))
          .catch((error) => {
            console.log(error);
            if (error.name === 'CastError') {
              return next(new BadRequestError(ERR_MOVIE_INCORRECT_DATA));
            }
            return next(error);
          });
      }
    })
    .catch((error) => next(error));
};
