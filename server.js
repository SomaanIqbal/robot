const express = require('express');
const app = express();

// init db client
const client = require('./db/client');
client.connect();

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

// Router: /api
app.use('/api', require('./api/index.js'));

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
