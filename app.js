const express = require('express');
const mongoose = require('mongoose');
// const helmet = require('helmet');
const { errors } = require('celebrate');
const routes = require('./routes');
const errorsHandler = require('./middlewares/errorHandler');
// const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const { limiter } = require('./utils/limiter');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();
// app.use(cors);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(helmet());
app.use(requestLogger); // подключаем логгер запросов
// app.use(limiter);

// // подключаемся к серверу mongo
mongoose.connect(DB_URL);

// // Краш-тест сервера
// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorsHandler); // централизованный обработчик ошибок

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
