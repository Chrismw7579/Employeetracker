const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: 3306,
    database: 'tracker'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    update('Gil', 'Olson', 3);
    view('employee');
});
  
const addDepartment = name => {
    connection.query('insert into department (name) values (?)',
     name, (err) => {
        if (err) {
            throw err;
        }
        console.log(`${name} department added.`);
     });
};

const addRole = (title, salary, dep) => {
    connection.query('insert into role (title, salary, department_id) values (?, ?, ?)', 
    [title, salary, dep], (err) => {
        if (err) {
            throw err;
        }

        console.log(`${title} role added.`);
    });
};

const addEmployee = (first, last, manager, role) => {
    connection.query('insert into employee (first_name, last_name, manager_id, role_id) values (?, ?, ?, ?)',
    [first, last, manager, role], (err) => {
        if (err) {
            throw err;
        }

        console.log(`${first} ${last} added to employees.`);
    });
};

const view = table => {
    connection.query('select * from ??', table, (err, results) => {
        if (err) {
            throw err;
        }
        console.table(results);
    })
};

const update = (first, last, id) => {
    connection.query('update employee set ? where ? and ?', 
    [
        {
            role_id: id
        },
        {
            first_name: first
        },
        {
            last_name: last
        }
    ], (err) => {
        if (err) {
            throw err;
        }

        console.log(`${first} ${last}'s role updated.`);
    });
};



