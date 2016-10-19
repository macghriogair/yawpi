// RP
CREATE RETENTION POLICY one_day ON pi_weather DURATION 24h REPLICATION 1 default

CREATE CONTINUOUS QUERY cq_30m ON pi_weather BEGIN SELECT mean(value) AS avg_value,max(value) AS max_value, min(value) AS min_value, spread(value) AS spread_value, median(value) AS median_value INTO pi_weather."default".temperature_aggr_30m FROM temperature GROUP BY time(30m) END

CREATE CONTINUOUS QUERY cq_30m_h ON pi_weather BEGIN SELECT mean(value) AS avg_value,max(value) AS max_value, min(value) AS min_value, spread(value) AS spread_value, median(value) AS median_value INTO pi_weather."default".humidity_aggr_30m FROM humidity GROUP BY time(30m) END
CREATE CONTINUOUS QUERY cq_30m_p ON pi_weather BEGIN SELECT mean(value) AS avg_value,max(value) AS max_value, min(value) AS min_value, spread(value) AS spread_value, median(value) AS median_value INTO pi_weather."default".pressure_aggr_30m FROM pressure GROUP BY time(30m) END
CREATE CONTINUOUS QUERY cq_30m_l ON pi_weather BEGIN SELECT mean(value) AS avg_value,max(value) AS max_value, min(value) AS min_value, spread(value) AS spread_value, median(value) AS median_value INTO pi_weather."default".lux_aggr_30m FROM lux GROUP BY time(30m) END

// select * from pi_weather."default".temperature_aggr_30m order by time desc
