// RP
CREATE RETENTION POLICY one_day ON pi_weather DURATION 24h REPLICATION 1 DEFAULT

CREATE CONTINUOUS QUERY cq_30m ON pi_weather BEGIN SELECT mean(value) AS avg_value,max(value) AS max_value, min(value) AS min_value, spread(value) AS spread_value, median(value) AS median_value INTO pi_weather."default".temperature_aggr_30m FROM temperature GROUP BY time(30m) END

// select * from pi_weather."default".temperature_aggr_30m order by time desc
