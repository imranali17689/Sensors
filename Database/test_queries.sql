-- =========================================
-- CHECK TABLE DATA
-- =========================================
select * from garage;
select * from parking_zone;
select * from sensors;
select * from zone_state;
select * from sensor_events;

-- =========================================
-- TEST CAR ENTERING
-- =========================================
insert into sensor_events (zone_id, sensor_id, direction)
values (1, 1, 'IN');

select * from zone_state;

-- =========================================
-- TEST SECOND CAR ENTERING
-- =========================================
insert into sensor_events (zone_id, sensor_id, direction)
values (1, 2, 'IN');

select * from zone_state;

-- =========================================
-- TEST CAR EXITING
-- =========================================
insert into sensor_events (zone_id, sensor_id, direction)
values (1, 2, 'OUT');

select * from zone_state;

-- =========================================
-- VIEW EVENT HISTORY
-- =========================================
select * from sensor_events
order by event_time desc;