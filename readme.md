# Yawpi. Yet another weather pi.

## Raspberry Pi 3 climate logger from Sensor Tag CC2650 to InfluxDB

A Javascript commandline tool to record climate data from a Texas Instruments [SensorTag CC2650](http://www.ti.com/tool/cc2650stk) into an [InfluxDB](https://docs.influxdata.com/influxdb/v0.13/) time series database.

It makes use of @sandeepmistry's Node BLE wrapper for the SensorTag, cf. https://github.com/sandeepmistry/node-sensortag

### Requirements

- Node v.6.10.2 (current LTS) or higher
- npm or [yarn](https://yarnpkg.com/lang/en/docs/install/)
- Only tested under Raspbian Jessie

### Installation

SSH into Raspberry and clone the repository:
    
    git clone <repository-url> <repo>

(alternatively, there is a Phing build.xml for deployment via rsync)

Make sure `config.json` exists:
    
    cp config.json.dist config.json

Install node dependencies and build using Yarn or npm:
    
    yarn install
    yarn run build

Note: To avoid conflicts between different architectures I had to install the node dependencies on the Pi itself. 

Run:
    
    node build/app.js

To run without sudo:

    sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)

### Configuration

The Influx Database can reside locally or on another machine. The host must be configured in `config.json`:

```json

// OPTIONAL, only used for logging
"mail" : { 
    "connectionString" : "smtps://<username>:<token>@<smtphost>",
    "to": "<recipient>",
    "from": "<sender>"
},

// REQUIRED by InfluxProxy
"influx": { 
    "host": "<influx.host>",
    "user": "<influx.user>",
    "pass": "<influx.pass>",
    "db": "<influx.pass>"
},

// REQUIRED, currently supports only single device ID
"sensor": { 
    "id": "<SensorTagId" 
},

// Interval in minutes to read data from SensorTag
"frequency": "3",

// Path to logfile
"logfile": "/var/log/piweather.log"
```

### Install as a service

On the Raspberry the tool was installed as a service using [forever-service](https://github.com/zapty/forever-service):

```
    sudo forever-service install piweather --script build/app.js
```


### Logging via Mail

The repo contains a simple e-mail logger wrapped around [Nodemailer](https://nodemailer.com/) to send logs:

Example crontab entry:

```
    0 */2 * * * /home/pi/pi-weather/src/sendlog.js > /home/pi/cron.log
```

### Further

The project was inspired by this blog entry https://www.hackster.io/eursan/complete-wireless-weather-station-ece694?ref=part&ref_id=13511&offset=0

Alternatively, you could use a round robin db like [rrdtool](http://oss.oetiker.ch/rrdtool/) which comes with some graphics capability already.
