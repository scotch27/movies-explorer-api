const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../utils/errors/notFoundError');
const { validateLogin, validateRegister } = require('../utils/validators/userValidator');
const { ERR_SOURCE_NOT_FOUND } = require('../utils/constants');

router.post('/signin', validateLogin, login);
router.post('/signup', validateRegister, createUser);

router.use(auth);

router.use('/', users);
router.use('/', movies);
router.use('*', () => {
  console.log('any adsress');
  throw new NotFoundError(ERR_SOURCE_NOT_FOUND);
});

module.exports = router;
