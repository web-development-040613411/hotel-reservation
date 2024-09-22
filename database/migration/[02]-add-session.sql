CREATE TABLE user_session (
    id TEXT PRIMARY KEY,
    expires_at TIMESTAMPTZ NOT NULL,
	user_id UUID NOT NULL
);

ALTER TABLE user_session
ADD FOREIGN KEY (user_id)
REFERENCES employee (id);