const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
    
})

module.exports = router;