const Movie = require('../models/movie');
const BadRequestError = require('../utils/errors/badRequestError');
const NotFoundError = require('../utils/errors/notFoundError');
const ForbiddenError = require('../utils/errors/forbiddenError');

module.exports.getMovies = (req, res, next) => {
  // Добавить сортировку
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => {
      throw new NotFoundError('Фильм с указанным _id не найдена.');
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нельзя удалять чужие фильмы');
      }
      Movie.deleteOne(movie)
        .then(() => res.send({ message: 'Фильм успешно удален' }))
        .catch(next);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные для удаления фильма'));
      }
      return next(error);
    });
};

module.exports.createMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId } = req.body;
  const ownerId = req.user._id;
  Movie.findOne({ owner: ownerId, movieId: movieId })
    .then((movie) => {
      if (movie) {
        res.status(200).send(movie);
      }
      else {
        Movie.create({ country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId, owner: ownerId })
          .then((movie) => res.status(201).send(movie))
          .catch((error) => {
            console.log(error);
            if (error.name === 'CastError') {
              return next(new BadRequestError('Переданы некорректные данные при создании фильма'));
            }
            return next(error);
          });
      }
    })
    .catch((error) => next(error));
};
