-- =========================================
-- SEED DATA FOR GRAND CENTER
-- =========================================

-- Garage
insert into garage (id, name)
values (1, 'Grand Center');

-- Parking zone for floors 4 and 5 combined
insert into parking_zone (id, garage_id, name, floor_range, capacity)
values (1, 1, 'Floors 4-5 Combined', '4-5', 120);

-- Initialize zone state
insert into zone_state (zone_id, current_count, status)
values (1, 0, 'OPEN');

-- Two ramp sensors
insert into sensors (id, zone_id, name, location_description)
values
(1, 1, 'Ramp Sensor 1', 'Ramp between floors 4 and 5'),
(2, 1, 'Ramp Sensor 2', 'Ramp between floors 4 and 5');