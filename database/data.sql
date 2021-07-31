
-- DANGER: this is NOT how to do it in the real world.
-- You should NEVER EVER check user data into Git!

insert into "users" ("username", "hashedPassword")
values ('anonymous', '$argon2i$v=19$m=4096,t=3,p=1$h7icQD/xZr8akZsX+hNA0A$h68atJWyjvunAwNOpSpMfg9sPvoMQ6dKwoh0dJhurWA');

insert into "data" ("UUID", "sensorType", "sensorValue", "deviceTimeStamp")
values ('fa0c33ce-68ab-44ab-9ac8-16de4f47cd0a', 'Temperature', '25', '2021-07-30T02:54:48.684406Z'),
  ('fa0c33ce-68ab-44ab-9ac8-16de4f47cd0a', 'Temperature', '26', '2021-07-30T03:54:48.684406Z'),
  ('fa0c33ce-68ab-44ab-9ac8-16de4f47cd0a', 'Temperature', '27', '2021-07-30T04:54:48.684406Z'),
  ('fa0c33ce-68ab-44ab-9ac8-16de4f47cd0a', 'Temperature', '29', '2021-07-30T05:54:48.684406Z'),
  ('fa0c33ce-68ab-44ab-9ac8-16de4f47cd0a', 'Temperature', '31', '2021-07-30T06:54:48.684406Z'),
  ('fa0c33ce-68ab-44ab-9ac8-16de4f47cd0a', 'Temperature', '30', '2021-07-30T07:54:48.684406Z'),
  ('fa0c33ce-68ab-44ab-9ac8-16de4f47cd0a', 'Temperature', '27', '2021-07-30T08:54:48.684406Z'),
  ('fa0c33ce-68ab-44ab-9ac8-16de4f47cd0a', 'Temperature', '24', '2021-07-30T09:54:48.684406Z'),
  ('fa0c33ce-68ab-44ab-9ac8-16de4f47cd0a', 'Temperature', '20', '2021-07-30T10:54:48.684406Z'),
  ('fa0c33ce-68ab-44ab-9ac8-16de4f47cd0a', 'Temperature', '15', '2021-07-30T11:54:48.684406Z'),
  ('fa0c33ce-68ab-44ab-9ac8-16de4f47cd0a', 'Temperature', '10', '2021-07-30T12:54:48.684406Z'),
  ('66f45ce9-c93c-44f3-ae9b-614fbfb8f62e', 'Temperature', '23', '2021-07-30T02:54:48.684406Z'),
  ('66f45ce9-c93c-44f3-ae9b-614fbfb8f62e', 'Temperature', '24', '2021-07-30T03:54:48.684406Z'),
  ('66f45ce9-c93c-44f3-ae9b-614fbfb8f62e', 'Temperature', '25', '2021-07-30T04:54:48.684406Z'),
  ('66f45ce9-c93c-44f3-ae9b-614fbfb8f62e', 'Temperature', '27', '2021-07-30T05:54:48.684406Z'),
  ('66f45ce9-c93c-44f3-ae9b-614fbfb8f62e', 'Temperature', '29', '2021-07-30T06:54:48.684406Z'),
  ('66f45ce9-c93c-44f3-ae9b-614fbfb8f62e', 'Temperature', '28', '2021-07-30T07:54:48.684406Z'),
  ('66f45ce9-c93c-44f3-ae9b-614fbfb8f62e', 'Temperature', '25', '2021-07-30T08:54:48.684406Z'),
  ('66f45ce9-c93c-44f3-ae9b-614fbfb8f62e', 'Temperature', '22', '2021-07-30T09:54:48.684406Z'),
  ('66f45ce9-c93c-44f3-ae9b-614fbfb8f62e', 'Temperature', '18', '2021-07-30T10:54:48.684406Z'),
  ('66f45ce9-c93c-44f3-ae9b-614fbfb8f62e', 'Temperature', '13', '2021-07-30T11:54:48.684406Z');

insert into "devices" ("UUID", "deviceName")
values ('fa0c33ce-68ab-44ab-9ac8-16de4f47cd0a', 'Test1'),
  ('66f45ce9-c93c-44f3-ae9b-614fbfb8f62e', 'Test2');
