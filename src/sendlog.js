#!/usr/bin/env node
/**
 * @date:    2016-08-16
 * @file:    sendlog.js
 * @author:  Patrick Mac Gregor <pmacgregor@3pc.de>
 */

var logger = require('./mail-logger');

import config from '../config.json';

logger.init({
    connect: config.mail.connectionString,
    to: config.mail.to,
    from: config.mail.from,
    channel: 'Message from Pi Weather Logger',
    attachments: [{
        "filename": "log",
        "path" : config.logfile
    }]
});

logger.log("Here is your piweather log...");
