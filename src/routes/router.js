const { Router } = require('express');
const router = Router();

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
router.get('/animes', (req, res) => {
    return res.json(animes);
})

//read specific item
router.get('/animes/:index', (req, res) => {
    const { index } = req.params;
    return res.json(animes[index]);
})

//create a new item
router.post('/animes', (req, res) => {
    const { name } = req.body;
    animes.push(name);
    return res.json(animes);
})

//update a specific item
router.put('/animes/:index', (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    animes[index] = name;
    return res.json(animes);
})

//delete a specific item
router.delete('/animes/:index', (req, res) => {
    const { index } = req.params;
    animes.splice(index, 1);
    return res.json(animes);
})

module.exports = router;