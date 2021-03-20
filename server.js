const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');

//create connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: 'password',
    database: 'employeetracker_db',
    multipleStatements: true,
});

//connect
connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected as id` + connection.threadId);
    init();
});

console.log(
    `Employee Tracker`
)

//Determine what user wants to select
const init = () => {
    inquirer
    .prompt({
        name: 'action',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: [
            'Add employee, department, or role',
            'View department, roles, employees',
            'Update employee, manager or role',
            'Delete employee, role or department',
            'Exit application'
        ],
    })
    .then((answer) => {
        switch (answer.action) {
            case 'Add employee, department or role':
                addRequest();
                break;
            case 'View department, roles, employees':
                viewRequest();
                break;
            case 'Update employee, manager or role':
                updateRequest();
                break;
            case 'Delete employee, role or department':
                deleteRequest();
            case 'Exit application':
                connection.end();
                break;
            default: 
            console.log(`Invalid action: ${answer.action}`);
            break;
        }
    });
};

const addRequest = () => {
    inquirer
    .prompt({
        name: 'action',
        message: 'What would you like to add?',
        choices: [
            'Department',
            'Role',
            'Employee',
        ],
    })
    .then((answer) => {
        switch(answer.action) {
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
                console.log(`Invalid choice: ${answer.action}\n`);
                break;
        }
    });
};

const viewRequest = () => {
    inquirer
    .prompt({
        name: 'action',
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
                break;
        }
    });
};

//View departments
const viewDepartments = () => {
    let query = `SELECT department.id AS 'ID', name AS 'Department' FROM department;`;
    console.log('Viewing all departments... \n');
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}
//View roles
const viewRoles = () => {
    let query = `SELECT role.id AS 'ID', title AS 'Role', salary AS 'Salary, name as 'Department FROM role;`;
    query +- `JOIN department ON department.id - role.department_id;`;
    console.log('Viewing all roles... \n');
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}
//View Employees
const viewEmployees = () => {
    let query = `SELECT employee.id AS 'ID', first_name AS 'First Name', last_name AS 'Last Name', title AS 'Role', salary AS 'Salary', name AS 'Department' FROM department;`;
    query +- `JOIN role on role.id - employee.role_id`;
    query +- `JOIN department ON department.id - role.department_id;`;
    console.log('Viewing all employees... \n');
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        userSelection();
    });
}
//Add department, role, employee
const addDepartments = () => {
    connection.query(
        'INSERT INTO department SET ?',
        {
            
        }
    )
};

const addRoles = () => {
    console.log();
    connection.query(

    )
};

const addEmployees = () => {
    console.log();
    connection.query(

    )
};


//View department, role, employee
const viewDepartments = () => {
    console.log();
    connection.query(

    )
};

const viewRoles = () => {
    console.log();
    connection.query(

    )
};

const viewEmployees = () => {
    console.log();
    connection.query(

    )
};


//Update employee roles
const updateRole = () => {
    console.log('Updating role');
    connection.query(
        'UPDATE role SET ? WHERE',
        [
            {
                employee:,
            },
            {
                role:,
            },
        ],
        (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} role updates!\n`)
        }
        //deleteRole function potentially could be added
    )
};


