<?php
/**
 * @date    2016-08-01
 * @file    create.php
 * @author  Patrick Mac Gregor <pmacgregor@3pc.de>
 */
$fname = "net.rrd";

$opts = array( "--step", "3", "--start", 0,
         "DS:input:COUNTER:600:U:U",
         "DS:output:COUNTER:600:U:U",
         "RRA:AVERAGE:0.5:1:600",
         "RRA:AVERAGE:0.5:6:700",
         "RRA:AVERAGE:0.5:24:775",
         "RRA:AVERAGE:0.5:288:797",
         "RRA:MAX:0.5:1:600",
         "RRA:MAX:0.5:6:700",
         "RRA:MAX:0.5:24:775",
         "RRA:MAX:0.5:288:797"
      );

$ret = rrd_create($fname, $opts);

if( $ret == 0 )
{
  $err = rrd_error();
  echo "Create error: $err\n";
}
