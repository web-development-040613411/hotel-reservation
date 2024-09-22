ALTER TABLE customer_detail
RENAME TO customers_detail;

ALTER TABLE customers_detail
RENAME sub_district to sub_district_id;

ALTER TABLE customers_detail
RENAME district to district_id;

ALTER TABLE customers_detail
RENAME post_number to postal_code;

ALTER TABLE districts 
RENAME postcode to postal_code;

ALTER TABLE customers_detail
ALTER COLUMN sub_district_id TYPE UUID USING sub_district_id::uuid;

ALTER TABLE customers_detail
ALTER COLUMN district_id TYPE UUID USING sub_district_id::uuid;

ALTER TABLE customers_detail
ADD CONSTRAINT districts_id_fkey 
FOREIGN KEY (district_id) REFERENCES districts (id);

ALTER TABLE customers_detail
ADD CONSTRAINT sub_districts_id_fkey 
FOREIGN KEY (sub_district_id) REFERENCES sub_districts (id);
