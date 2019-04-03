const express = require('express');
const server = express();
const router = express.Router();

const helmet = require('helmet');

const router = require('./router/router');

//middlewares 
server.use(helmet());
server.use(express.json())

//sanity check 
server.get('/' , (req, res) => {
    res.send(`
        <h1>Api Portal</h1>
    `)
})

//router
server.use('/api/router', router);

module.exports = server;