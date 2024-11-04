ALTER TYPE transaction_status
RENAME ATTRIBUTE 'paid' TO 'complete';

ALTER TYPE transaction_status
ADD VALUE 'open';

ALTER TYPE transaction_status
ADD VALUE 'expired';
