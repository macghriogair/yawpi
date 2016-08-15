/**
 * @date:    2016-07-31
 * @file:    rrd.js
 * @author:  Patrick Mac Gregor <pmacgregor@3pc.de>
 */

'use strict';

var rrdtool = require('rrdtool');

var start = rrdtool.now() - 10;
// var db = rrdtool.create('test.rrd', { start: start, step: 1 }, [
//   'DS:test:GAUGE:1:0:100',
//   'RRA:AVERAGE:0.5:1:10'
// ]);
var db = rrdtool.open('test.rrd');

db.update(start + 0, 15, function() {
    console.log('inserted row');
});
db.update(start + 1, 90);
db.update(start + 2, 35);
db.update(start + 3, 45);
db.update(start + 4, 85);
db.update(start + 5, 10);
db.update(start + 6, 60);
db.update(start + 7, 55);
db.update(start + 8, 75);
db.update(start + 9, 25);

// db.fetch('AVERAGE', start, start + 9, function (err, data) {
//   if (err) { throw err; }

//   console.log(data);
// });
