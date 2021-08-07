require('dotenv').config();

const express = require('express');
const http = require('http');
const process = require('process');
const routes = require('../routes/router');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use(routes);

server.listen(process.env.PORT, (error) => {
    if (error) {
        console.log(error);
        return
    }

    console.log(`Servidor está rodando na porta ${process.env.PORT} 🚀`)
})

module.exports = app;
