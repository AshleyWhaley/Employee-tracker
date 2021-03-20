INSERT INTO department (depart_name)
VALUES
('Executive Commander'),
('Assistant to the Commander'),
('Medical Staff'),
('Engineer'),
('Communication'),
('Navigation'),
('Red Shirt');

INSERT INTO role (title, salary, department_id)
VALUES
('Commanding Officer', 200, 1),
('First Officer', 150, 2),
('Chief Medical Officer', 125, 3),
('Chief Engineer', 125, 4),
('Communication Officer', 100, 5),
('Navigation Officer', 100, 6),
('Helmsman', 75, 7);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
('James', 'Kirk', 1),
('Schn Tgai', 'Spock', 2),
('Montgomery', 'Scott', 3),
('Leonard', 'McCoy', 4),
('Nyota', 'Uhura', 5),
('Pavel', 'Chekov', 6),
('Hikaru', 'Sulu', 7);

UPDATE employee SET manager_id = 1 WHERE id > 1;