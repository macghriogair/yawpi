#!/usr/bin/env node
/**
 * @date:    2016-08-16
 * @file:    sendlog.js
 * @author:  Patrick Mac Gregor <pmacgregor@3pc.de>
 */

var nconf = require('nconf');
var logger = require('./src/mail-logger');

nconf.file({ file: 'config.json' });

logger.init({
    connect: nconf.get('mail:connectionString'),
    to: nconf.get('mail:to'),
    from: nconf.get('mail:from'),
    channel: 'Message from Pi Weather Logger',
    attachments: [{
        "filename": "log",
        "path" : "/var/log/piweather.log"
    }]
});

logger.log("Here is your piweather log...");
