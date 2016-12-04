<?php
/**
 * @date    2016-08-01
 * @file    update.php
 * @author  Patrick Mac Gregor <macgregor.porta@gmail.com>
 */

$fname = "net.rrd";

$total_input_traffic = 0;
$total_output_traffic = 0;

$updater = new RRDUpdater($fname);
while (true) {
    $total_input_traffic += rand(10000, 15000);
    $total_output_traffic += rand(10000, 30000);

    echo time() . ": " . $total_input_traffic . " and " . $total_output_traffic . "\n";

//    $ret = rrd_update($fname, array("$total_input_traffic", "$total_output_traffic"), time());
    $ret =  $updater->update(array("input" => $total_input_traffic, "output" => $total_output_traffic), time());

    if ($ret == 0) {
        $err = rrd_error();
        echo "ERROR occurred: $err\n";
    }
    sleep(3);
}
