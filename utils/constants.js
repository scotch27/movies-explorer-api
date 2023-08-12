require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.URL_REGEXP = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
module.exports.JWT_SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

// Сообщения
module.exports.MSG_MOVIE_SUSSES_DELETED = 'Фильм успешно удален';

// Ошибки
module.exports.ERR_SOURCE_NOT_FOUND = 'Запрашиваемый ресурс не найден';
module.exports.ERR_UNAUTHORIZED = 'Необходима авторизация';
module.exports.ERR_SERVER = 'Ошибка сервера';

module.exports.ERR_MOVIE_ID_NOT_FOUND = 'Фильм с указанным _id не найден.';
module.exports.ERR_MOVIE_NOT_OWNER_DELETED = 'Нельзя удалять чужие фильмы';
module.exports.ERR_MOVIE_INCORRECT_DATA = 'Переданы некорректные данные фильма';

module.exports.ERR_USER_ID_NOT_FOUND = 'Фильм с указанным _id не найден.';
module.exports.ERR_USER_INCORRECT_DATA = 'Переданы некорректные данные при создании пользователя';
module.exports.ERR_USER_EMAIL_REGISTERED = 'Пользователь с таким email уже зарегистрирован';
module.exports.ERR_BAD_EMAIL_OR_PASSWORD = 'Неправильные почта или пароль';

module.exports.ERR_FORMAT_EMAIL = 'Неправильный формат почты';
module.exports.ERR_FORMAT_MIN_LENGTH = (fieldName, minValue) => `Минимальная длина поля "${fieldName}" - ${minValue}`;
module.exports.ERR_FORMAT_MAX_LENGTH = (fieldName, maxValue) => `Минимальная длина поля "${fieldName}" - ${maxValue}`;
module.exports.ERR_FORMAT_LINK = (fieldName) => `Указана некорректная ссылка для "${fieldName}"`;
