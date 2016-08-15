/*globals require,module*/
/**
 * @date:    2016-08-15
 * @file:    influx-proxy.js
 * @author:  Patrick Mac Gregor <pmacgregor@3pc.de>
 */

var influx = require('influx');

var InfluxProxy = function() {};

InfluxProxy.prototype.init = function(options) {
    "use strict";
    this._series = {};
    this._client = influx({
      host : options.host,
      port : 8086,
      protocol : 'http',
      username : options.user,
      password : options.pass,
      database : options.db
    });
    this.prepare();
    return this;
};

InfluxProxy.prototype.prepare = function() {
    "use strict";
    this._series = {
        temperature: [],
        humidity: [],
        pressure: [],
        lux: []
    };
    return this;
};

InfluxProxy.prototype.send = function(callback) {
    "use strict";
    var that = this;
    console.log("Writing data series:", JSON.stringify(this._series));
    this._client.writeSeries(this._series, [], function(err) {
        if(err) {
            console.error(err);
        }
        that.prepare();
        if (callback) {
            callback();
        }
    });
};

InfluxProxy.prototype.data = function(key, value) {
    "use strict";
    this._series[key].push([{ value : value, time : new Date() }]);
    return this;
};

module.exports = new InfluxProxy();
