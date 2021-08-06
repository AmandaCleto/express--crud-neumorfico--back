const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const { findId } = require('../utils/index');
const { ThrowErrorCustom } = require('../utils/errors');

const router = Router();

const path_list_todos_file = path.resolve(__dirname, '..', 'storage', 'list-todos.json');
const file_todos = require(path_list_todos_file);

router.get('/teste', (req, res, next) => {
    res.status(200).send({
        mensagem: "funcionou 🚀"
    });
})

//read entire file
router.get('/todo/all', (req, res) => {
    return res.json(file_todos)
})

//read specific item
router.get('/todo/:id?', (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new ThrowErrorCustom({
                message: "You must pass an id",
                status: 404,
            });
        }

        let target = findId(file_todos.todos, id);
        if (target == -1) {
            throw new ThrowErrorCustom({
                message: "Id not found",
                status: 404,
            });
        }

        return res.json(file_todos.todos[id]);
    } catch(error) {
        console.log(error)
        return res.status(error.status).send({ message: error.message });
    }
})

//create a new item
router.post('/todo', (req, res) => {
    const todo = req.body;

    file_todos.todos.push(todo);

    fs.writeFile(path_list_todos_file, JSON.stringify(file_todos, null, 2), 'utf-8', function(err) {
        if (err) throw err;
        return res.json(file_todos);
    })
})

//update a specific item
router.put('/todo/:index', (req, res) => {
    const { index } = req.params;
    const { item } = req.body;

    let target = findId(file_todos.todos, index);
    if (target != -1) {
        file_todos.todos[target].item = item;
    }

    return res.json(file_todos);
})

//delete a specific item
router.delete('/todo/:index', (req, res) => {
    const { index } = req.params;

    let target = findId(file_todos.todos, index);
    if (target != -1) {
        file_todos.todos.splice(target, 1);
    }

    return res.json(file_todos);
})

module.exports = router;