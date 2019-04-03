const server = require('./server');

const port = process.env.PORT || 5000;

server.listen('/', () => {
    res.send( 
        console.log(`*** Server running on ${port} ***`)
    )
});

