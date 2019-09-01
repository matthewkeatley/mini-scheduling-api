DROP USER IF EXISTS 'scheduling'@'localhost';
CREATE USER 'scheduling'@'localhost' IDENTIFIED WITH mysql_native_password BY 'pw';;

DROP DATABASE IF EXISTS schedulingDB;
CREATE DATABASE schedulingDB;

GRANT ALL PRIVILEGES ON schedulingDB.* TO 'scheduling'@'localhost';

Use schedulingDB;
CREATE TABLE users (
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   firstName VARCHAR(40) NOT NULL,
   lastName VARCHAR(40) NOT NULL,
   email VARCHAR(255),
   phone VARCHAR(20),
   isManager BOOLEAN,  
   contactMethod VARCHAR(20)
);

Use schedulingDB;
CREATE TABLE shifts (
   	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	fk_user INT NOT NULL,
	startTime DATETIME NOT NULL,
	endTime DATETIME NOT NULL,
	FOREIGN KEY(fk_user) REFERENCES users(id)
);

Use schedulingDB;
INSERT INTO users (firstName, lastName, email, phone, isManager, contactMethod)
VALUES ('Test', 'User', 'test.user@test.com', '123-456-7890', false, 'phone');

Use schedulingDB;
INSERT INTO shifts (fk_user, startTime, endTime)
VALUES (1, '2019-08-20 10:00:00', '2019-08-20 11:00:00');