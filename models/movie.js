const mongoose = require('mongoose');
const { URL_REGEXP } = require('../utils/constants');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          const regex = URL_REGEXP;
          const str = v;
          return regex.test(str);
        },
        message: 'Укажите ссылку на постер к фильму',
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          const regex = URL_REGEXP;
          const str = v;
          return regex.test(str);
        },
        message: 'Укажите ссылку на трейлер фильма',
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          const regex = URL_REGEXP;
          const str = v;
          return regex.test(str);
        },
        message: 'Укажите ссылку на миниатюрное изображение постера к фильму',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);
