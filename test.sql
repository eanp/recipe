-- Active: 1698635336323@@147.139.210.135@5432@b16@public
CREATE TABLE users(
	name VARCHAR,
	umur INTEGER,
	alamat VARCHAR
);

INSERT INTO users (name,umur,alamat) VALUES('dita',19,'wonosobo');
INSERT INTO users (name,umur,alamat) VALUES('jafar',20,'dieng');
INSERT INTO users (name,umur,alamat) VALUES('farhan',20,'purwokerto');

SELECT * FROM users;

UPDATE users SET alamat='tegal' WHERE name='farhan';

DELETE FROM users WHERE name='jafar';

SELECT * FROM users WHERE alamat='wonosobo' ORDER BY umur ASC;