<?php
/**
 * @date    2016-08-01
 * @file    fetch.php
 * @author  Patrick Mac Gregor <pmacgregor@3pc.de>
 */
$rrdFile = 'net.rrd';
$options = array( "AVERAGE", "--resolution", "1", "--start", "-1h", "--end", "start+1h");
$out = rrd_fetch($rrdFile, $options);

echo "---INPUT---\n";
foreach ($out["data"]["input"] as $key => $value) {
    if (! is_nan($value)) {
        echo "At timestamp $key, the value is "  . round($value, 2) ."\n";
    }
}

echo "---OUTPUT---\n";
foreach ($out["data"]["output"] as $key => $value) {
    if (! is_nan($value)) {
        echo "At timestamp $key, the value is "  . round($value, 2) ."\n";
    }
}
