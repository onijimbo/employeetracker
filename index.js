const mysql = require('mysql');
const inquire = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'assbutt1',

    database: 'employee_db'


});

connection.connect(function(err) {
    if (err) throw err;
    console.log('connection success');
});

const manage = () =>{
    inquire.prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'Manage',
        choices: [
            'View all employees',
            'View all employees by department',
            'View all employees by manager',
            'Add employee',
            'Remove employee',
            'Update employee\'s role',
            'Update employee\'s manager',
            'Exit'
        ]
    })
    .then(function(respone){
        switch(respone.Manage){
            case 'View all employees':
                console.log('You chose: View all employees')
                break;
            case 'View all employees by department':
                console.log('You chose: View all employees by department')
                break;
            case 'View all employees by manager':
                console.log('You chose: View all employees by manager')
                break;
            case 'Add employee':
                console.log('You chose: Add employee')
                break;
            case 'Remove employee':
                console.log('You chose: Remove employee')
                break;
            case 'Update employee\'s role':
                console.log('You chose: Update employee\'s role')
                break;        
            case 'Update employee\'s manager':
                 console.log('You chose: Update employee\'s manager')
                break;
            case 'Exit':
                console.log('You chose: Exit')
                break;        
                            
        }
    });
};

manage()