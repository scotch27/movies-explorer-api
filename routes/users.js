const router = require('express').Router();
const { validateUserProfile } = require('../utils/validators/userValidator');
const { getMe, updateMe, } = require('../controllers/users');

router.get('/users/me', getMe);
router.patch('/users/me', validateUserProfile, updateMe);

module.exports = router;
