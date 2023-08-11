const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');
const UnauthorizedError = require('../utils/errors/unauthorizedError');
const {isUser} = require('../controllers/users');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new UnauthorizedError('Необходима авторизация!');
  }
  let payload;
  try {
    const token = authorization.replace('Bearer ', '');
    payload = jwt.verify(token, JWT_SECRET);

    // Проверка, если в БД удалили пользователя, а токен валидный
    if(!await isUser(payload._id)){
      throw new UnauthorizedError('Необходима авторизация');
    }
  } catch (error) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
