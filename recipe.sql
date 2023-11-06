-- Active: 1698635336323@@147.139.210.135@5432@b16@public
CREATE TABLE recipes(
	id SERIAL PRIMARY KEY,
	title VARCHAR,
	content TEXT
);

SELECT * FROM recipes;

INSERT INTO recipes (title, content) VALUES('telur rebus','Lorem Ipsum is simply dummy text ');

ALTER TABLE recipes RENAME COLUMN content TO ingredients;

ALTER TABLE recipes ADD COLUMN photo VARCHAR;

CREATE TABLE category(
	id INT UNIQUE,
	name VARCHAR
);
INSERT INTO category(id,name) VALUES(1,'main course');
INSERT INTO category(id,name) VALUES(2,'appetizer');
INSERT INTO category(id,name) VALUES(3,'dessert');

ALTER TABLE recipes ADD COLUMN category_id INT;

ALTER TABLE recipes ALTER COLUMN category_id SET NOT NULL;

-- new input -- 
INSERT INTO recipes (title, ingredients, photo,category_id) VALUES('es krim','susu, air, es','https://picsum.photos/200',3);

ALTER TABLE recipes ADD CONSTRAINT fk_category_id FOREIGN KEY (category_id) REFERENCES category(id);

SELECT * FROM recipes JOIN category ON recipes.category_id=category.id;

SELECT recipes.id, recipes.title, recipes.ingredients, recipes.photo, category.name AS category FROM recipes JOIN category ON recipes.category_id=category.id;

SELECT recipes.id, recipes.title, recipes.ingredients, recipes.photo, category.name AS category FROM recipes JOIN category ON recipes.category_id=category.id ORDER BY category_id DESC;

SELECT recipes.id, recipes.title, recipes.ingredients, recipes.photo, category.name AS category FROM recipes JOIN category ON recipes.category_id=category.id WHERE recipes.title ILIKE '%nasi%' ORDER BY category_id DESC;

SELECT recipes.id, recipes.title, recipes.ingredients, recipes.photo, category.name AS category FROM recipes JOIN category ON recipes.category_id=category.id WHERE recipes.ingredients ILIKE '%nasi%' ORDER BY category_id;

SELECT recipes.id, recipes.title, recipes.ingredients, recipes.photo, category.name AS category FROM recipes JOIN category ON recipes.category_id=category.id ORDER BY recipes.id DESC OFFSET 6 LIMIT 2 ;

SELECT recipes.id, recipes.title, recipes.ingredients, recipes.photo, category.name AS category FROM recipes JOIN category ON recipes.category_id=category.id WHERE category_id=3;

CREATE TABLE users(
	uuid VARCHAR UNIQUE,
	email VARCHAR NOT NULL,
	password VARCHAR NOT NULL,
	username VARCHAR 
);


INSERT INTO USERS(uuid,email,password,username) VALUES('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed','admin@recipe.com','$argon2i$v=19$m=16,t=2,p=1$NmVCQlhsb3R1cXA0bzRpVg$47arSpSw1CWytOVNffzPPg','admin recipe');


SELECT * FROM users WHERE email='admin@recipe.com';