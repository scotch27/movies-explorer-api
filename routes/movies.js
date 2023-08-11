const router = require('express').Router();
const { validateMovieId, validateMovie } = require('../utils/validators/movieValidator');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');

// возвращает все сохранённые текущим пользователем фильмы
router.get('/movies', getMovies);

// создаёт фильм с переданными в теле
// country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId 
router.post('/movies', validateMovie, createMovie);

// удаляет сохранённый фильм по id
router.delete('/movies/:_id', validateMovieId, deleteMovie);
module.exports = router;
