#!/usr/bin/env node
/**
 * @date:    2016-08-17
 * @file:    query.js
 * @author:  Patrick Mac Gregor <pmacgregor@3pc.de>
 */

var _ = require('lodash');
var fs = require('fs');
var proxy = require('./influx-proxy');
var logger = require('./mail-logger');

import config from "../config.json";

proxy.init(config.influx);

var lockFile = 'alerted.lock';
var query = 'select mean(value) from temperature where time > now() - 10m';
var limit = 10;
var isAlertable = false;

var checkLocked = function(cb) {
    fs.open(lockFile, 'wx', function(err) {
        if (err && err.code === 'EEXIST') {
            console.log('Lock file exists, exiting...');
            process.exit(0);
        }
        cb();
    });
};

var onMessageSent = function() {
    fs.open(lockFile, 'wx', function () {
        console.log('lock file created');
    });
};

proxy.query(query, function(err, results) {
    isAlertable = results[0][0].mean < limit;
    if (! isAlertable) {
        process.exit(0);
    }

    checkLocked(function() {
        console.log('Preparing alert message...');
        logger.init({
            connect: config.mail.connectionString,
            to: config.mail.to,
            from: config.mail.from,
            channel: 'ALERT from Pi Weather Logger',
        });

        logger.log("Temperature dropped below " + limit + " deg for last 5 measurements (10 min.)!\n\n\n" + JSON.stringify(results[0]), onMessageSent);
    })
});

