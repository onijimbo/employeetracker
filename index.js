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
                employeeView()
                break;
            case 'View all employees by department':
                inquire.prompt({
                    type: 'list',
                    message: 'Wich Department?',
                    name: 'Department',
                    choices: [
                        'Zyuranger',
                        'Mighty Morphin',
                        'Kakuranger',
                        'Alien Rangers'
                    ]
                })
                .then(function(response1){
                    switch(response1.Department){
                        case 'Zyuranger':
                            let targetId = 
                            byDepartmentView()
                    }
                })

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

const employeeView = () =>{
const qString = `SELECT employee.id, employee.first_name, employee.last_name, 
roles.title, department.name as department, roles.salary, CONCAT(employee.first_name,'',employee.last_name) as manager 
FROM employee LEFT JOIN roles ON (employee.role_id = roles.id) 
LEFT JOIN department ON (roles.department_id = department.id)
LEFT JOIN employee ON employee.id = employee.manager_id ORDER BY employee.id;`


connection.query(qString, function(err, res){
    // console.log('hello')
    // console.log(res);
    console.table(res)
    manage()
})


};

const byDepartmentView = (targetId) =>{

   

const qString = `SELECT employee.id, employee.first_name, employee.last_name,
role.title, department.name, employee.manager_id
FROM employee INNER JOIN department ON ()`
};

const byManagerView = () =>{

};

const addEmployee = () =>{

};

const removeEmployee = () =>{

};

const updateRole = () =>{

};

const updateManger = () =>{

};

const exit = () =>{

};