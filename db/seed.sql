use tracker;

-- departments
INSERT INTO department (name)
VALUES ('Robotics');
INSERT INTO department (name)
VALUES ('Aerospace');
INSERT INTO department (name)
VALUES ('Logistics');

-- roles
INSERT INTO role (title, salary, department_id)
VALUES ('Engineer', 100000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ('Manager', 200000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('Secretary', 50000, 3);

-- Employee values
INSERT into employee (first_name, last_name, manager_id, role_id)
VALUES ('Dave', 'Smith', 1, 2);
INSERT into employee (first_name, last_name, manager_id, role_id)
VALUES ('Tom', 'Davis', 2, 2);
INSERT into employee (first_name, last_name, manager_id, role_id)
VALUES ('Jim', 'Williams', 1, 3);
INSERT into employee (first_name, last_name, manager_id, role_id)
VALUES ('Brandon', 'Olson', 3, 2);
INSERT into employee (first_name, last_name, manager_id, role_id)
VALUES ('Steve', 'Moss', 2, 4);
INSERT into employee (first_name, last_name, manager_id, role_id)
VALUES ('Erick', 'Davisal', 1, 3);
INSERT into employee (first_name, last_name, manager_id, role_id)
VALUES ('Sam', 'Black', 2, 3);
INSERT into employee (first_name, last_name, manager_id, role_id)
VALUES ('Robert', 'Boyd', 1, 4);
INSERT into employee (first_name, last_name, manager_id, role_id)
VALUES ('Sam', 'Beckett', 3, 2);

select * from role;

select * from department;

select * from employee;