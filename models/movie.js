const mongoose = require('mongoose');
const { URL_REGEXP, ERR_FORMAT_LINK } = require('../utils/constants');

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
        message: ERR_FORMAT_LINK('image'),
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
        message: ERR_FORMAT_LINK('trailerLink'),
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
        message: ERR_FORMAT_LINK('thumbnail'),
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
