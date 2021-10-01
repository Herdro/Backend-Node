const express = require('express');
const app = express();
const moment = require('moment');

const { config } = require('../config/index');

app.get('/:year', function(req, res) {
    const year = req.params.year;
    if (moment([year]).isLeapYear()) {
        res.send('El año ' + year + ' es bisiesto');
    }

    res.send('El año ' + year + ' no es bisiesto');
});

app.listen(config.port, function() {
    console.log(`Listening http://localhost:${config.port}`)
});