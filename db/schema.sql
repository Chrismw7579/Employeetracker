CREATE DATABASE tracker;

use tracker;

CREATE TABLE department(
    id int auto_increment not null,
    PRIMARY KEY (id),
    name VARCHAR(30)
);

CREATE TABLE role (
    id int auto_increment not null,
    PRIMARY key (id),
    title VARCHAR(30),
    salary DECIMAL,
    department_id int not null,
    CONSTRAINT fk_department
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee (
    id int auto_increment,
    PRIMARY key (id),
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    manager_id int,
    role_id int,
    CONSTRAINT fk_role
    FOREIGN key (role_id)
    REFERENCES role(id)
        ON DELETE CASCADE
);






