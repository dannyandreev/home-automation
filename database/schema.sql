set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.

drop schema "public" cascade;

create schema "public";

create table "public"."users" (
  "userId"         serial,
  "username"       text           not null,
  "hashedPassword" text           not null,
  "createdAt"      timestamptz(6) not null default now(),
  primary key ("userId"),
  unique ("username")
);

create table "public"."data" (
  "key"              serial,
  "UUID"             text           not null,
  "sensorType"       text           not null,
  "sensorValue"      numeric,
  "deviceTimeStamp"  timestamptz(6) not null default now(),
  "createdAt"        timestamptz(6) not null default now(),
  primary key ("key"),
  unique ("key")
);

create table "public"."devices" (
  "UUID"             text           not null,
  "deviceName"       text           not null,
  "createdAt"        timestamptz(6) not null default now(),
  primary key ("UUID"),
  unique ("UUID")
);
