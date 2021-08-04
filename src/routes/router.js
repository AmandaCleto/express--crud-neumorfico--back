const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const router = Router();

const path_list_todos_file = path.resolve(__dirname, '..', 'storage', 'list-todos.json');
const file_todos = require(path_list_todos_file);

const animes = [
    'Haikyuu',
    'Shingeki no Kyojin',
    'Hunter X Hunter'
]

router.get('/teste', (req, res, next) => {
    res.status(200).send({
        mensagem: "funcionou 🚀"
    });
})

//read all files
router.get('/todos', (req, res) => {
    // fs.readFile(path_list_todos_file, 'utf-8', (error, jsonString) => {
    //     if (error) {
    //         console.error(error);
    //     }
    //     return res.json(JSON.parse(jsonString));
    // })
    return res.json(file_todos)
})

//read specific item
router.get('/todos/:index', (req, res) => {
    const { index } = req.params;
    return res.json(file_todos[index]);
})

//create a new item
router.post('/todos', (req, res) => {
    const { name } = req.body;
    animes.push(name);
    return res.json(animes);
})

//update a specific item
router.put('/todos/:index', (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    animes[index] = name;
    return res.json(animes);
})

//delete a specific item
router.delete('/todos/:index', (req, res) => {
    const { index } = req.params;
    animes.splice(index, 1);
    return res.json(animes);
})

module.exports = router;