const winston = require('winston');
const express = require('express');
const app = express();

const error = require('./error');
const upload = require('./upload');

app.use('/public/images/uploads', express.static('public/images/uploads'));
app.use('/api/upload', upload);
require('./logger')();
app.use(error);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    const app_startup_logger = winston.createLogger({
        transports: [ new winston.transports.Console() ]
    });
    if (err) throw err;
    app_startup_logger.log('info', `app started on ${port}`);
});