const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const { findTarget } = require('../utils/index');

const router = Router();

const path_list_todos_file = path.resolve(__dirname, '..', 'storage', 'list-todos.json');
const file_todos = require(path_list_todos_file);

router.get('/teste', (req, res, next) => {
    res.status(200).send({
        mensagem: "funcionou 🚀"
    });
})

//read entire file
router.get('/todos', (req, res) => {
    return res.json(file_todos)
})

//read specific item
router.get('/todos/:index', (req, res) => {
    const { index } = req.params;
    return res.json(file_todos.todos[index]);
})

//create a new item
router.post('/todos', (req, res) => {
    const todo = req.body;

    file_todos.todos.push(todo);

    fs.writeFile(path_list_todos_file, JSON.stringify(file_todos, null, 2), 'utf-8', function(err) {
        if (err) throw err;
        return res.json(file_todos);
    })
})

//update a specific item
router.put('/todos/:index', (req, res) => {
    const { index } = req.params;
    const { item } = req.body;

    let target = findTarget(file_todos.todos, index);
    if (target != -1) {
        file_todos.todos[target].item = item;
    }

    return res.json(file_todos);
})

//delete a specific item
router.delete('/todos/:index', (req, res) => {
    const { index } = req.params;

    let target = findTarget(file_todos.todos, index);
    if (target != -1) {
        file_todos.todos.splice(target, 1);
    }

    return res.json(file_todos);
})

module.exports = router;