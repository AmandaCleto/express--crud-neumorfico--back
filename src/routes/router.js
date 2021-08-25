const { Router } = require('express');
const router = Router();

const todoController = require('../controllers/todo');
const userController = require('../controllers/user');

router.post('/user', userController.create);
router.get('/user', userController.read);


router.post('/todo', todoController.create);
router.get('/todo', todoController.read);
router.put('/todo', todoController.update);
router.delete('/todo', todoController.destroy);


router.get('/teste', (req, res, next) => {
    res.status(200).send({
        mensagem: "funcionou 🚀"
    });
})

module.exports = router;