ALTER TABLE reservations
ADD FOREIGN KEY (customer_id) REFERENCES customers_detail(id);