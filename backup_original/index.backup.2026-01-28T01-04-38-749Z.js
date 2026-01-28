const express = require('express');
const app = express();
__path = process.cwd()
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;
let code = require('./pair'); 

require('events').EventEmitter.defaultMaxListeners = 500;

app.use('/code', code);
app.use('/pair', async (req, res, next) => {
    res.sendFile(__path + '/pair.html')
});
app.use('/', async (req, res, next) => {
    res.sendFile(__path + '/index.html')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`
Don't Forget To Give Star ‼️

Follow us on:
github: https://github.com/there-no-such-thing-as-prefect-crime
youtube: https://www.youtube.com/@mxgamecoder
whatsapp channel: https://whatsapp.com/channel/0029Vb7Ew0t8fewhGUdO1J0s

Server running on http://localhost:` + PORT)
});

module.exports = app;
