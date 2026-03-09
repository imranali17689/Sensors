-- =========================================
-- GRAND CENTER PARKING DATABASE
-- SIMPLE VERSION FOR SPRINT 1
-- =========================================

-- Delete old tables if you need to restart completely
drop table if exists sensor_events cascade;
drop table if exists zone_state cascade;
drop table if exists sensors cascade;
drop table if exists parking_zone cascade;
drop table if exists garage cascade;

-- =========================================
-- TABLE 1: garage
-- Stores the garage itself
-- =========================================
create table garage (
    id integer primary key,
    name varchar(100) not null
);

-- =========================================
-- TABLE 2: parking_zone
-- Stores the tracked zone inside the garage
-- In this project: Floors 4-5 combined
-- =========================================
create table parking_zone (
    id integer primary key,
    garage_id integer not null references garage(id),
    name varchar(100) not null,
    floor_range varchar(20) not null,
    capacity integer not null check (capacity > 0)
);

-- =========================================
-- TABLE 3: sensors
-- Stores the two ramp sensors
-- =========================================
create table sensors (
    id integer primary key,
    zone_id integer not null references parking_zone(id),
    name varchar(100) not null,
    location_description varchar(200),
    is_active boolean not null default true
);

-- =========================================
-- TABLE 4: zone_state
-- Stores the LIVE count for the zone
-- One row per zone
-- =========================================
create table zone_state (
    zone_id integer primary key references parking_zone(id),
    current_count integer not null default 0 check (current_count >= 0),
    status varchar(20) not null default 'OPEN' check (status in ('OPEN', 'FULL')),
    last_event_time timestamp
);

-- =========================================
-- TABLE 5: sensor_events
-- Stores the historical log of every IN/OUT event
-- =========================================
create table sensor_events (
    id integer generated always as identity primary key,
    zone_id integer not null references parking_zone(id),
    sensor_id integer not null references sensors(id),
    direction varchar(10) not null check (direction in ('IN', 'OUT')),
    event_time timestamp not null default current_timestamp
);

-- =========================================
-- INDEXES
-- Helps performance for searching event history
-- =========================================
create index idx_sensor_events_zone_id on sensor_events(zone_id);
create index idx_sensor_events_sensor_id on sensor_events(sensor_id);
create index idx_sensor_events_event_time on sensor_events(event_time);

-- =========================================
-- FUNCTION:
-- Automatically updates zone_state when a sensor event is inserted
-- =========================================
create or replace function update_zone_state()
returns trigger
language plpgsql
as $$
declare
    current_val integer;
    max_capacity integer;
    new_val integer;
    sensor_zone integer;
begin
    -- Make sure the sensor belongs to the same zone as the event
    select zone_id into sensor_zone
    from sensors
    where id = new.sensor_id;

    if sensor_zone is null then
        raise exception 'Sensor does not exist.';
    end if;

    if sensor_zone <> new.zone_id then
        raise exception 'Sensor does not belong to this zone.';
    end if;

    -- Get current count and zone capacity
    select zs.current_count, pz.capacity
    into current_val, max_capacity
    from zone_state zs
    join parking_zone pz on zs.zone_id = pz.id
    where zs.zone_id = new.zone_id
    for update;

    if new.direction = 'IN' then
        new_val := current_val + 1;
    elsif new.direction = 'OUT' then
        new_val := current_val - 1;
    else
        raise exception 'Invalid direction.';
    end if;

    if new_val < 0 then
        raise exception 'Count cannot go below 0.';
    end if;

    if new_val > max_capacity then
        raise exception 'Count cannot exceed capacity.';
    end if;

    update zone_state
    set current_count = new_val,
        status = case
                    when new_val >= max_capacity then 'FULL'
                    else 'OPEN'
                 end,
        last_event_time = new.event_time
    where zone_id = new.zone_id;

    return new;
end;
$$;

-- =========================================
-- TRIGGER:
-- Runs the function after every sensor event insert
-- =========================================
create trigger trg_update_zone_state
after insert on sensor_events
for each row
execute function update_zone_state();