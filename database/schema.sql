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

CREATE TABLE customer_detail (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  address VARCHAR NOT NULL,
  sub_district VARCHAR NOT NULL,
  district VARCHAR NOT NULL,
  province_id UUID NOT NULL,
  post_number VARCHAR NOT NULL,
  phone_number VARCHAR NOT NULL,
  email VARCHAR NOT NULL
);

CREATE TABLE provinces (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL
)

CREATE TABLE user_session (
    id TEXT PRIMARY KEY,
    expires_at TIMESTAMPTZ NOT NULL,
)

ALTER TABLE room ADD FOREIGN KEY (type_id) REFERENCES room_type (id);

ALTER TABLE reservation ADD FOREIGN KEY (room_id) REFERENCES room (id);

ALTER TABLE reservation ADD FOREIGN KEY (customer_id) REFERENCES customer_detail (id);

ALTER TABLE customer_detail ADD FOREIGN KEY (province_id) REFERENCES provinces (id);

ALTER TABLE user_session ADD FOREIGN KEY (user_id) REFERENCES employee (id);

INSERT INTO provinces (province) VALUES
('Bangkok'),
('Amnat Charoen'),
('Ang Thong'),
('Bueng Kan'),
('Buri Ram'),
('Chachoengsao'),
('Chai Nat'),
('Chaiyaphum'),
('Chanthaburi'),
('Chiang Mai'),
('Chiang Rai'),
('Chonburi'),
('Chumphon'),
('Kalasin'),
('Kamphaeng Phet'),
('Kanchanaburi'),
('Khon Kaen'),
('Krabi'),
('Lampang'),
('Lamphun'),
('Loei'),
('Lopburi'),
('Mae Hong Son'),
('Maha Sarakham'),
('Mukdahan'),
('Nakhon Nayok'),
('Nakhon Pathom'),
('Nakhon Phanom'),
('Nakhon Ratchasima'),
('Nakhon Sawan'),
('Nakhon Si Thammarat'),
('Nan'),
('Narathiwat'),
('Nong Bua Lam Phu'),
('Nong Khai'),
('Nonthaburi'),
('Pathum Thani'),
('Pattani'),
('Phang Nga'),
('Phatthalung'),
('Phayao'),
('Phetchabun'),
('Phetchaburi'),
('Phichit'),
('Phitsanulok'),
('Phrae'),
('Phuket'),
('Prachinburi'),
('Prachuap Khiri Khan'),
('Ranong'),
('Ratchaburi'),
('Rayong'),
('Roi Et'),
('Sa Kaeo'),
('Sakon Nakhon'),
('Samut Prakan'),
('Samut Sakhon'),
('Samut Songkhram'),
('Saraburi'),
('Satun'),
('Sing Buri'),
('Sisaket'),
('Songkhla'),
('Sukhothai'),
('Suphan Buri'),
('Surat Thani'),
('Surin'),
('Tak'),
('Trang'),
('Trat'),
('Ubon Ratchathani'),
('Udon Thani'),
('Uthai Thani'),
('Uttaradit'),
('Yala'),
('Yasothon');

