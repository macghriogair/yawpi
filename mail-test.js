/*globals require*/
/**
 * @date:    2016-08-15
 * @file:    mail-test.js
 * @author:  Patrick Mac Gregor <pmacgregor@3pc.de>
 */

var nconf = require('nconf');
var log = require('./src/mail-logger.js');

nconf.file({ file: 'config.json' });

var mailOptions = {
    connect: nconf.get('mail:connectionString'),
    to: nconf.get('mail:to'),
    from: nconf.get('mail:from'),
    channel: 'Message from Forever App'
};

log.init(mailOptions);
log.log('Hello World');


