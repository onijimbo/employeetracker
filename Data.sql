use employee_db;

insert into department
(name)
VALUES
('Zyuranger'), ('Mighty Morphin'), ('Kakuranger'), ('Alien Rangers');

insert into roles
(title, salary, department_id)
VALUES
('Trex', 100000, 1),
('Mammoth', 75000, 1),
('Tiger', 60000, 1),
('Dragon', 100000, 2),
('Lion', 75000, 2),
('Griffen', 60000, 2),
('BGKark', 100000, 3),
('BGLogan', 75000, 3),
('BGGammer', 60000, 3),
('Crane', 100000, 4),
('Wolf', 75000, 4),
('Toad', 60000, 4);

insert into employee
(first_name, last_name, role_id, manager_id)
VALUES
('Geki', 'Yamato', 1, null),
('Goushi', 'Sharma', 2, 1),
('Boi', 'Dime', 3, 1),
('Jason', 'Scott', 4, null),
('Zack', 'Taylor', 5, 4),
('Trini', 'Kwan', 6, 4),
('Tsuruhime', 'Kark', 7, null),
('Saizou', 'Logan', 8, 7),
('Jiraiya', 'Gammer', 9, 7),
('Delphine', 'Aquitar', 10, null),
('Cestro', 'Aquitar', 11, 10),
('Corcus', 'Aquitar', 12, 10);