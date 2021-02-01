'use strict';

const express = require('express');
const bodyParser = require('body-parser');

// App
const app = express();
const router = express.Router();
//handler
const {search} = require('../endpoint/handler/handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', [router]);

const searchRoute = router.post('/search', async (req, res) => {
    res.json((await search(req.body.filters)));
});

app.use(searchRoute);

// Constants
const PORT = 4000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
