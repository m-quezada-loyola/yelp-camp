
const express = require('express');
const router = express.Router();
const users = require('../controllers/users')
const passport = require('passport');
const { storeReturnTo } = require('../middleware');


router.get('/register', users.renderRegister)

router.post('/register', users.register)

router.get('/login', users.renderLogin)

const loginOptions = { failureFlash: true, failureRedirect: '/login' }

router.post('/login', storeReturnTo, passport.authenticate('local', loginOptions), users.login)

router.get('/logout', users.logout);

module.exports = router;
