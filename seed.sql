USE employeetracker_db;

INSERT INTO department (name)
VALUES
('Executive'),
('Main Deck'),
('Lower Deck');

INSERT INTO role (title, salary, department_id)
VALUES
('Commanding Officer', 200000, 1),
('First Officer', 150000, 1),
('Chief Medical Officer', 125000, 2),
('Chief Engineer', 125000, 2),
('Communication Officer', 100000, 3),
('Navigation Officer', 100000, 3),
('Helmsman', 75000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
('James', 'Kirk', 1),
('Schn Tgai', 'Spock', 2),
('Montgomery', 'Scott', 3),
('Leonard', 'McCoy', 4)
('Nyota', 'Uhura', 5),
('Pavel', 'Chekov', 6),
('Hikaru', 'Sulu', 7);