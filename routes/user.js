
const express = require('express');
const router = express.Router();
const users = require('../controllers/users')
const passport = require('passport');
const { storeReturnTo } = require('../middleware');

router.route('/register')
    .get(users.renderRegister)
    .post(users.register)

const loginOptions = { failureFlash: true, failureRedirect: '/login' }

router.route('/login')
    .get(users.renderLogin)
    .post(storeReturnTo, passport.authenticate('local', loginOptions), users.login)

router.get('/logout', users.logout);

module.exports = router;
