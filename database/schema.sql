CREATE TABLE user_session (
    id TEXT PRIMARY KEY,
    expires_at TIMESTAMPTZ NOT NULL,
)

CREATE TYPE transaction_status AS ENUM (
  'preserve',
  'paid'
);

CREATE TYPE role AS ENUM (
  'administrator',
  'frontdesk',
  'house_keeping_manager',
  'house_keeping'
);

CREATE TYPE current_status AS ENUM (
  'vacant',
  'occupied',
  'maintenance',
  'off_market',
  'departing'
);

CREATE TABLE reservation (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID NOT NULL,
  room_id UUID NOT NULL,
  price FLOAT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  display_color VARCHAR,
  transaction_status transaction_status
);

CREATE TABLE employee (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR UNIQUE,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  date_of_birth DATE NOT NULL,
  password VARCHAR NOT NULL,
  role role,
  session_id UUID NOT NULL
);

CREATE TABLE website_config (
  logo_path VARCHAR,
  primary_color VARCHAR,
  secondary_color VARCHAR,
  hotel_name VARCHAR
);

CREATE TABLE room_type (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL UNIQUE,
  detail TEXT NOT NULL,
  capacity INT NOT NULL,
  price FLOAT NOT NULL,
  picture_path VARCHAR
);

CREATE TABLE rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  number VARCHAR NOT NULL UNIQUE,
  type_id UUID ,
  current_status current_status DEFAULT 'vacant'
);

CREATE table provinces (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code  varchar(4),
  name_en varchar(255)
);

CREATE table districts (
  id  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code  varchar(10),
  name_en varchar(255),
  province_id UUID REFERENCES provinces(id),
  postal_code varchar(10)
);

CREATE table sub_districts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code  varchar(10),
  name_en varchar(255),
  district_id UUID REFERENCES districts(id)
);


CREATE TABLE customer_detail (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  address VARCHAR NOT NULL,
  sub_district_id VARCHAR NOT NULL,
  district_id VARCHAR NOT NULL REFERENCES districts(id),
  province_id UUID NOT NULL REFERENCES provinces(id),
  postal_code VARCHAR NOT NULL,
  phone_number VARCHAR NOT NULL,
  email VARCHAR NOT NULL
);

ALTER TABLE room ADD FOREIGN KEY (type_id) REFERENCES room_type (id);

ALTER TABLE reservation ADD FOREIGN KEY (room_id) REFERENCES room (id);

ALTER TABLE reservation ADD FOREIGN KEY (customer_id) REFERENCES customer_detail (id);

ALTER TABLE customer_detail ADD FOREIGN KEY (province_id) REFERENCES provinces (id);

ALTER TABLE user_session ADD FOREIGN KEY (user_id) REFERENCES employee (id);
