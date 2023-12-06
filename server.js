const express = require('express');
const app = express();
const PORT = 8080;

// init db client
const client = require('./db/client');
client.connect();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Router: /api
app.use('/api', require('./api'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
