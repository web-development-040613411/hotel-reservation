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

