/**
 * @date:    2016-08-15
 * @file:    influx-text.js
 * @author:  Patrick Mac Gregor <pmacgregor@3pc.de>
 */

var proxy = require("./../src/influx-proxy.js");
var nconf = require('nconf');
nconf.file({ file: './../config.json' });

proxy.init(nconf.get('influx'))
    .data('temperature', 10)
    .send(function() {

    proxy.data('humidity', 50)
        .data('lux', 1000)
        .send();
});
