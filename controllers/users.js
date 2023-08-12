const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../utils/errors/badRequestError');
const NotFoundError = require('../utils/errors/notFoundError');
const ConflictError = require('../utils/errors/conflictError');
const {
  JWT_SECRET,
  ERR_USER_ID_NOT_FOUND,
  ERR_USER_INCORRECT_DATA,
  ERR_USER_EMAIL_REGISTERED,
} = require('../utils/constants');

module.exports.getMe = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => res.send(user))
    .catch((error) => next(error));
};

module.exports.updateMe = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFoundError(ERR_USER_ID_NOT_FOUND);
    })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new BadRequestError(ERR_USER_INCORRECT_DATA));
      }
      return next(error);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
    }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new BadRequestError(ERR_USER_INCORRECT_DATA));
      }
      if (error.code === 11000) {
        return next(new ConflictError(ERR_USER_EMAIL_REGISTERED));
      }
      return next(error);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      return res.send({ token });
    }).catch((error) => next(error));
};

module.exports.isUser = (userId) => User.findOne({ _id: userId })
  .orFail(false)
  .then(true)
  .catch(false);
