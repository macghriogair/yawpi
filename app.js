/**
 * @date:    2016-08-05
 * @file:    app.js
 * @author:  Patrick Mac Gregor <pmacgregor@3pc.de>
 */

var async = require('async');
var sensorTag = require('sensortag');

var proxy = require('./src/influx-proxy');
// var logger = require('./src/mail-logger');
var nconf = require('nconf');

nconf.file({ file: 'config.json' });
var frequency = nconf.get('frequency') * 60 * 1000,
    sensorId = nconf.get('sensor:id');

proxy.init(nconf.get('influx'));

// logger.init({
//     connect: nconf.get('mail:connectionString'),
//     to: nconf.get('mail:to'),
//     from: nconf.get('mail:from'),
//     channel: 'Message from Pi Weather Logger'
// });

var tag = null;
// listen for tags:
var run = function() {
    "use strict";

    proxy.prepare();

    async.series([

    function(next) {
        if (null !== tag) {
            return next();
        }
        console.log("Scanning for device...");
        sensorTag.discoverById(sensorId, function(t) {
            console.log("discovered!", t);
            tag = t;
            next();
        });
    },
    function(next) {
        if (tag.connectedAndSetUp) {
            return next();
        }
        tag.once('disconnect', function() {
            tag = null;
            console.error('Device was disconnected!');
       });
       next();
    },
    function(next) {
        if (tag.connectedAndSetUp) {
            return next();
        }
        tag.connectAndSetUp(next);
    },
    function(next) {
        console.log("Enabling instruments...");
        async.parallel([
            function(next) {
                tag.enableHumidity(function() {
                    next();
                });
            },
            function(next) {
                tag.enableBarometricPressure(function() {
                    next();
                });
            },
            // function(next) {
            //     tag.enableLuxometer(function() {
            //         next();
            //     });
            // },
        ], next);
    },
    function(next) {
        console.log("Reading...");
        async.parallel([
            function(next) {
                tag.readHumidity(function(err, temp, hum) {
                    if(err) {
                        next();
                    }
                    proxy.data('temperature', parseFloat(temp.toFixed(2)));
                    proxy.data('humidity', parseFloat(hum.toFixed(2)));
                    next();
                });
            },
            function(next) {
                tag.readBarometricPressure(function(err, hpa) {
                    if(err) {
                        next();
                    }
                    //  1 bar = 10^5 Pa
                    //  1 hPa = 100 Pa
                    proxy.data('pressure', parseFloat((hpa).toFixed(2)));
                    next();
                });
            },
            // function(next) {
            //     tag.readLuxometer(function(err, lux) {
            //         if(err) {
            //             next();
            //         }
            //         //  1 bar = 10^5 Pa
            //         proxy.data('lux', parseFloat(lux.toFixed(4)));
            //         next();
            //     });
            // }
        ], next);
    },
    function(next) {
        proxy.send(next);
    },
    function(next) {

        async.parallel([
            function(next) {
                tag.disableHumidity(function() {
                    next();
                });
            },
            function(next) {
                tag.disableBarometricPressure(function() {
                    next();
                });
            },
            // function(next) {
            //     tag.disableLuxometer(function() {
            //         next();
            //     });
            // }
        ], next);
    }

    ], function(err) { //This is the final callback
        if(err) {
            console.log(err);
        }
        console.log('Waiting...');
        // tag.disconnect();
    });
};

console.log("Starting...");
run();
setInterval(run, frequency);
