const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: 'password',
    database: 'employeetracker_db',
});

//Add department, role, employee
const addDepartments = () => {
    console.log();
    connection.query(

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