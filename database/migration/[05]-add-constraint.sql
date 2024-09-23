ALTER table provinces
ADD CONSTRAINT provinces_code_uniq UNIQUE (code);

ALTER table districts
RENAME province_id TO province_code;

ALTER table districts
ADD CONSTRAINT distrits_code_uniq UNIQUE (code);

ALTER TABLE districts
ALTER COLUMN province_code TYPE varchar;

ALTER TABLE districts
ADD FOREIGN KEY (province_code) REFERENCES provinces (code);

ALTER TABLE sub_districts
RENAME district_id TO district_code;

ALTER TABLE sub_districts
ADD CONSTRAINT sub_districts_code_uniq UNIQUE (code);

ALTER TABLE sub_districts
ALTER COLUMN district_code TYPE varchar;

ALTER TABLE sub_districts
ADD FOREIGN KEY (district_code) REFERENCES districts (code);