const { Router } = require('express');
const router = Router();

const todoController = require('../controllers/todo');
const userController = require('../controllers/user');

router.post('/todo', todoController.create);


router.post('/user', userController.create);


module.exports = router;