CREATE TABLE rooms (
	room_id SERIAL PRIMARY KEY
);

CREATE TABLE reviews (
	review_id SERIAL PRIMARY KEY,
	room_id INT,
	username VARCHAR(255),
	gender SMALLINT,
	profilenum SMALLINT,
	reviewdate VARCHAR(255),
	sentence VARCHAR,
	accuracy REAL,
	communication REAL,
	cleanliness REAL,
	locationr REAL,
	checkin REAL,
	valuer REAL,
	overall REAL
);
