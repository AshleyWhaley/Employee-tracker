const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');

//create connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employeetracker_db',
    multipleStatements: true,
});

//connect
connection.connect((err) => {
    if (err) throw err;
    console.log(
        `Employee Tracker`
    )
    init();
});



//Determine what user wants to select
init = () => {
    inquirer
    .prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'Add employee, department, or role',
            'View department, roles, employees',
            'Update role of employee',
            'Exit application'
        ],
    })
    .then((answer) => {
        switch (answer.action) {
            case 'Add employee, department, or role':
                addRequest();
                break;
            case 'View department, roles, employees':
                viewRequest();
                break;
            case 'Update role of employee':
                updateRole();
                break;
            case 'Exit application':
                connection.end();
                break;
            default: 
            console.log(`Invalid action: ${answer.action}`);
            init();
            break;
        }
    });
}

//Choose which type user would like to add
const addRequest = () => {
    inquirer
    .prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to add?',
        choices: [
            'Department',
            'Role',
            'Employee',
        ],
    })
    .then((answer) => {
        switch (answer.action) {
            case 'Department':
                addDepartments();
                break;
            case 'Role':
                addRoles();
                break;
            case 'Employee':
                addEmployees();
                break;
            default:
                console.log(`Invalid action: ${answer.action}\n`);
                init();
                break;
        }
    });
}

//Choose the type user would like to view
const viewRequest = () => {
    inquirer
    .prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to view?',
        choices: [
            'Department',
            'Role',
            'Employee',
        ],
    })
    .then((answer) => {
        switch(answer.action) {
            case 'Department':
                viewDepartments();
                break;
            case 'Role':
                viewRoles();
                break;
            case 'Employee':
                viewEmployees();
                break;
            default:
                console.log(`Invalid choice: ${answer.action}\n`);
                init();
                break;
        }
    });
}

//View departments
const viewDepartments = () => {
    let query = `SELECT department.id AS 'ID', depart_name AS 'Department' FROM department;`;
    console.log('Viewing all departments... \n');
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}
//View roles
const viewRoles = () => {
    let query = `SELECT role.id AS 'ID',  title AS 'Role', salary AS 'Salary', depart_name AS 'Department' FROM role `;
    query += `JOIN department ON department.id = role.department_id;`;
    console.log('Viewing all roles...\n');
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}
//View Employees
const viewEmployees = () => {
    let query = `SELECT employee.id AS 'ID', first_name AS 'First Name', last_name AS 'Last Name', title AS 'Role', salary AS 'Salary', depart_name AS 'Department' FROM employee `;
    query += `JOIN role on role.id = employee.role_id `;
    query += `JOIN department ON department.id = role.department_id;`;
    console.log('Viewing all employees...\n');
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}
//Add department, role, employee
const addDepartments = () => {
    inquirer
    .prompt({
        name:'Name',
        type: 'input',
        message: 'What is the department name?'
    })
    .then((answer) => {
        console.log('Added new department...\n');
        connection.query('INSERT INTO department SET ?',
        {
          depart_name: answer.Name  
        },
        (err,res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} department added to company!\n`);
            init();
        });
    });
}

const addRoles = () => {
    let query = `SELECT * FROM department`
    connection.query(query, (err, res) => {
        if (err) throw err;
        inquirer
        .prompt([
            {
                name: 'roleName',
                type: 'input',
                message: 'What is the name of their role?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Enter the salary for the role.'
            },
            {
                name: 'depart_id',
                type: 'list',
                choices: res.map(choice => choice.depart_name),
                message: 'Select the desired department for the role.'
            }
        ])
        .then((answer) => {
            console.log('Adding new role...\n');
            connection.query(`INSERT INTO role (title,salary,department_id)
            VALUES
                ('${answer.title}', '${answer.salary}', (SELECT id FROM department WHERE depart_name = '${answer.depart_id}'));`,
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} role added!\n`);
                    init();
                });
        });
    })
}

const addEmployees = () => {
    let query = `SELECT * from role`
    connection.query(query, (err, res) => {
        if (err) throw err;
        inquirer
        .prompt([
            {
                name: 'first',
                type: 'input',
                message: 'What is the new employees first name?'
            },
            {
                name: 'last',
                type: 'input',
                message: 'What is the new employees last name?',
            },
            {
                name: 'role_id',
                type: 'list',
                choices: res.map(choice => choice.title),
                message: 'Select the role for the new employee.'
            }
        ])
        .then((answer) => {
            console.log('Added new employee...\n');
            connection.query(`INSERT INTO employee (first_name, last_name, role_id)
            VALUES
            ('${answer.first}', '${answer.last}', (SELECT id FROM role WHERE title = '${answer.role_id}'));`,
            (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} new employee added.\n`);
                init();
            });
        });
    })
}


//Update employee roles
const updateRole = () => {
    let query = `SELECT CONCAT(first_name, " ", last_name) AS full_name from employee; SELECT * from role;`
    connection.query(query, (err, res) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'employee_id',
                    type: 'list',
                    choices: res[0].map(choice => choice.full_name),
                    message: 'Choose an employee you would like to update the role of.'
                },
                {
                    name: 'newRole',
                    type: 'list',
                    choices: res[1].map(choice => choice.title),
                    message: 'Choose a new role.'
                }
            ])
            .then((answer) => {
                console.log('Updating employee role...\n');
                connection.query(
                    `UPDATE employee
                SET role_id = (SELECT role.id FROM role WHERE title = '${answer.newRole}')
                WHERE id = (SELECT id FROM (SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = '${answer.employee_id}') AS temp)`,
                    (err, res) => {
                        if (err) throw err;
                        console.log(`${res.affectedRows} employee updated!\n`);
                        init();
                    });
            });
    });
}



