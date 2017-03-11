/*globals require*/
/**
 * @date:    2016-08-15
 * @file:    mail-test.js
 * @author:  Patrick Mac Gregor <pmacgregor@3pc.de>
 */

var log = require('./mail-logger.js');

import config from '../config.json';

var mailOptions = {
    connect: config.mail.connectionString,
    to: config.mail.to,
    from: config.mail.from,
    channel: 'Message from Forever App'
};

log.init(mailOptions);
log.log('Hello World');


