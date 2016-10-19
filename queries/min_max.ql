select max(max_value), min(min_value) from pi_weather."default".temperature_aggr_30m where time > now() - 2d group by time(24h)

select mean(avg_value), median(median_value) from pi_weather."default".temperature_aggr_30m where time > now() - 2d group by time(24h)

// cq 1d
CREATE CONTINUOUS QUERY cq_24h ON pi_weather BEGIN SELECT mean(avg_value) AS avg_value, max(max_value) AS max_value, min(min_value) AS min_value, median(median_value) AS median_value INTO pi_weather."default".temperature_aggr_1d FROM pi_weather."default".temperature_aggr_30m GROUP BY time(1d) END

// max/min temp in last 24 hours
select max(median_value) from pi_weather."default".temperature_aggr_30m where time > now() - 24h order by time desc
select min(median_value) from pi_weather."default".temperature_aggr_30m where time > now() - 24h order by time desc


// last x values
select value from temperature order by time desc limit 5
select value from temperature,humidity order by time desc limit 5
