# Yawpi. Yet another weather pi.

## Raspberry Pi 3 climate logger from Sensor Tag CC2650 to InfluxDB

A Javascript commandline tool to record climate data from a Texas Instruments [SensorTag CC2650](http://www.ti.com/tool/cc2650stk) into an [InfluxDB](https://docs.influxdata.com/influxdb/v0.13/) time series database.

It makes use of @sandeepmistry's Node BLE wrapper for the SensorTag, cf. https://github.com/sandeepmistry/node-sensortag

On the Raspberry Pi 3 the tool was installed as a service using [forever-service](https://github.com/zapty/forever-service):

```
    sudo forever-service install piweather --script app.js
```

There is also a simple e-mail logger wrapped around [Nodemailer](https://nodemailer.com/) to send logs:

Example crontab entry:

```
    0 */2 * * * /home/pi/pi-weather/sendlog.js > /home/pi/cron.log
```

Inspired by this blog entry https://www.hackster.io/eursan/complete-wireless-weather-station-ece694?ref=part&ref_id=13511&offset=0

For my use case, I did not want to store the data to a cloud service as proposed in the blog post, therefore I have an influxdb residing on another maching in the local network. The influx host can be configured in config.json:

```json

"influx": {
    "host": "<influx.host>",
    "user": "<influx.user>",
    "pass": "<influx.pass>",
    "db": "<influx.pass>"
},
```

Alternatively, you could use a round robin db like [rrdtool](http://oss.oetiker.ch/rrdtool/) which comes with some graphics capability already.
