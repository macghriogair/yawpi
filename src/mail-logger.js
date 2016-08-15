/*globals require,module*/
/**
 * @date:    2016-08-15
 * @file:    mail-logger.js
 * @author:  Patrick Mac Gregor <pmacgregor@3pc.de>
 */

var nodemailer = require('nodemailer');

var MailLogger = function() {};

MailLogger.prototype.init = function(options) {
    "use strict";
    this._options = options;
    this._transporter = nodemailer.createTransport(this._options.connect);
};

MailLogger.prototype.log = function(message, cb) {
    "use strict";
    var mailOptions = {
        from: this._options.from,
        to: this._options.to,
        subject: this._options.channel,
        attachments: this._options.attachments || [],
        text: message
    };
    this._transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
        if(cb) {
            cb();
        }
    });
};

module.exports = new MailLogger();
