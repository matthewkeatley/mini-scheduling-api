

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

DROP DATABASE schedulingDB;
CREATE DATABASE schedulingDB;

Use schedulingDB;
CREATE TABLE contactMethods (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	method VARCHAR(20) NOT NULL
);

Use schedulingDB;
INSERT INTO contactMethods (method)
VALUES ('email'), ('phone');

Use schedulingDB;
CREATE TABLE users (
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   firstName VARCHAR(40),
   lastName VARCHAR(40),
   email VARCHAR(255),
   phone VARCHAR(20),
   isManager BOOLEAN,  
   fk_contactMethod INT NOT NULL,
   FOREIGN KEY(fk_contactMethod) REFERENCES contactMethods(id)
);

Use schedulingDB;
CREATE TABLE shifts (
   	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	fk_user INT NOT NULL,
	startTime DATETIME NOT NULL,
	endTime DATETIME NOT NULL,
	available BOOLEAN,
	FOREIGN KEY(fk_user) REFERENCES users(id)
);