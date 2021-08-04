// const express = require('express');
// const server = express();

// server.use(express.json());

const animes = [
    'Haikyuu',
    'Shingeki no Kyojin',
    'Hunter X Hunter'
]

//CRUD = create, read, update, delete
//read all files
server.get('/animes', (req, res) => {
    return res.json(animes);
})

//read specific item
server.get('/animes/:index', (req, res) => {
    const { index } = req.params;
    return res.json(animes[index]);
})

//create a new item
server.post('/animes', (req, res) => {
    const { name } = req.body;
    animes.push(name);
    return res.json(animes);
})

//update a specific item
server.put('/animes/:index', (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    animes[index] = name;
    return res.json(animes);
})

//delete a specific item
server.delete('/animes/:index', (req, res) => {
    const { index } = req.params;
    animes.splice(index, 1);
    return res.json(animes);
})

// server.listen(3000);