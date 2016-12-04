<?php
/**
 * @date    2016-07-31
 * @file    test.php
 * @author  Patrick Mac Gregor <macgregor.porta@gmail.com>
 */

$rrdFile = 'test.rrd';
$options = array( "AVERAGE", "--resolution", "60", "--start", "-1h", "--end", "start+1h");
// rrd_create($rrdFile,
//  array(
//   "--steps", 10,
//   "--start",920804400,
//   "DS:speed:COUNTER:20:U:U",
//   "RRA:AVERAGE:0.5:1:24",
//   "RRA:AVERAGE:0.5:6:10"
//   )
// );
$out = rrd_fetch($rrdFile, $options);

foreach ($out["data"]["speed"] as $key => $value) {
    echo "At timestamp $key, the value for myfield is "  . floatval($value) ."\n";
}

$updater = new RRDUpdater($rrdFile);
$updater->update(array("speed" => "504"), time());

print_r(rrd_lastupdate($rrdFile));
