const express = require('express');
const router = express.Router();
const userRoute = require('./userRoute/index');
const transactionsRoute = require('./transactionsRoute/index')
const dashboardRoute = require('./dashboardRoute/index')

router.use('/user', userRoute);
router.use('/transactions', transactionsRoute);
router.use('/dashboard', dashboardRoute);

module.exports = router;