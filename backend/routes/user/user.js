const express = require('express');
const router = express.Router();
const User = require('../../controllers/user/userProfile');

router.post('/create', User.createUser);
router.put('/update/:id', User.updateUser); 


module.exports = router; 
