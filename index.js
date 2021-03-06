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
   
    start();
});

const start = () => {
    inquirer.prompt({
        name: 'Options',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'Add a department.',
            'Add a role.',
            'Add an employee.',
            'View employess by department',
            'View departments.',
            'View roles.',
            'View employees.',
            'Update an employee.',
            'Exit.'
        ]
    }).then(answer => {
        
        switch (answer.Options) {
            case 'Add a department.':
                addDepartment();
                break;
            case 'Add a role.':
                addRole();
                break;
            case 'Add an employee.':
                addEmployee();
                break;
            case 'View employess by department':
                viewByDepartment();
                break;
            case 'View departments.':
                view('department');
                break;
            case 'View roles.':
                view('role');
                break;
            case 'View employees.':
                viewAll();
                break;
            case 'Update an employee.':
                update();
                break;
            case 'Exit.':
                connection.end();
        }
    });
}

// Checks if an id from a table exists
const find = (table, id, cb) => {
    
    connection.query('select * from ?? where ?', 
        [
            table, 
            {
                id: id
            }
        ], (err, results) => {
            if (err) {
                throw err;
            }
            cb(results != '');
        });
}
  
const addDepartment = () => {
    
    inquirer.prompt([
        {
            name: 'department',
            type: 'input',
            message: 'What is the name of the department?'
        }
    ]).then(name => {
        connection.query('insert into department (name) values (?)',
        name.department, (err) => {
           if (err) {
               throw err;
           }
           console.log(`${name.department} department added.`);
           start();
        
        });
    });
};

const addRole = () => {

    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What is the title of the role?'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the salary of the role?'
        },
        {
            name: 'dep',
            type: 'input',
            message: 'What is the department id of the role?'
        }
    ]).then(({title, salary, dep}) => {

        // Checks that the department exists before adding a new role
        find('department', dep, (hasDep) => {
            if (hasDep) {
                connection.query('insert into role (title, salary, department_id) values (?, ?, ?)', 
                [title, salary, dep], (err) => {
                    if (err) {
                        throw err;
                    }
            
                    console.log(`${title} role added.`);
                    start();
                });
            } else {
                console.log('There is no department with that id');
                addRole();
            }
        });
    });
}

const addEmployee = () => {

    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'What is their first name?'
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'What is their last name?'
        },
        {
            name: 'manager',
            type: 'input',
            message: 'What is their manager id?'
        },
        {
            name: 'role',
            type: 'input',
            message: 'What is their role id?'
        },
    ]).then(({first_name, last_name, manager, role}) => {

        // Checks that the role exists before inserting the employee
        find('role', role, hasRole => {
            if (hasRole) {
                connection.query('insert into employee (first_name, last_name, manager_id, role_id) values (?, ?, ?, ?)',
                [first_name, last_name, manager, role], (err) => {
                    if (err) {
                        throw err;
                    }
            
                    console.log(`${first} ${last} added to employees.`);
                    start();
                });
            } else {
                console.log('No role with that id exists.');
                addEmployee();
            }
        });
    });
}

const view = table => {
    connection.query('select * from ??', table, (err, results) => {
        if (err) {
            throw err;
        }
        console.table(results);
        start();
    });
};

const viewAll = () => {
    connection.query(`select employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary
                    from employee
                        inner join role
                            on role.department_id = employee.role_id 
                        inner join department
                            on department.id = role.department_id
                        order by employee.id
                    `, (err, results) => {
                        if (err) {
                            throw err;
                        }
                        console.table(results);
                    })
}

const viewByDepartment = () => {
    inquirer.prompt([
        {
            name: 'id',
            type: 'input',
            message: 'What is the id of the department do you want to see?'
        }
    ]).then(({id}) => {
        connection.query(`select employee.id, employee.first_name, employee.last_name
        from department
            inner join employee
                on department.id = role_id
            where department.id = ?; 
        `, id, (err, results) => {
        if (err) {
            throw err;
        }

        console.table(results);
        start();
    });
    })
}

const update = () => {

    inquirer.prompt([
        {
            name: 'first',
            type: 'input',
            message: 'What is their first name?'
        },
        {
            name: 'last',
            type: 'input',
            message: 'What is their last name?'
        },
        {
            name: 'role',
            type: 'input',
            message: 'What do you want to changer their role id to?'
        },
    ]).then(({first, last, role}) => {

        // checks if the role exists before trying to update the employee
        find('role', role, hasRole => {
            if (hasRole) {
                connection.query('update employee set ? where ? and ?', 
                [
                    {
                        role_id: role
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
                    start();
                });
            } else {
                console.log('No role with that id exists.');
                update();
            }
        });
    });
}



