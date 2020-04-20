DROP DATABASE if exists employee_db;

CREATE DATABASE employee_db;

use employee_db;

create table department(
id INT NOT NULL AUTO_INCREMENT,
name varchar(20),
PRIMARY KEY (id)
);

CREATE TABLE role(
id INT NOT NULL AUTO_INCREMENT,
title varchar(20),
salary decimal,
department_id int,
PRIMARY KEY (id),
constraint fk_department foreign key (department_id) references department(id)
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(20),
last_name VARCHAR(20),
role_id INT,
manager_id INT,
PRIMARY KEY (id),
CONSTRAINT fk_role FOREIGN KEY (role_id)
REFERENCES role(id),
CONSTRAINT fk_manager FOREIGN KEY (manager_id)
REFERENCES employee(id)
);

