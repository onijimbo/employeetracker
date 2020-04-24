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
                // console.log('You chose: View all employees')
                employeeView()
                break;
            case 'View all employees by department':
                byDepartmentView()

                break;
            case 'View all employees by manager':
                byManagerView()
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
                connection.end();
                break;        
                            
        }
    });
};

manage()
// View all employees
const employeeView = () =>{

const qString = ` SELECT
employee.id,
employee.first_name,
employee.last_name,
department.name as department,
roles.title,
roles.salary,
CONCAT(manager.first_name, ' ', manager.last_name) as manager
FROM employee
LEFT JOIN roles
ON employee.role_id = roles.id
LEFT JOIN department
ON roles.department_id = department.id
LEFT JOIN employee manager
ON manager.id = employee.manager_id;`


connection.query(qString, function(err, res){
    if (err) throw err;
    
    // console.log('hello')
    // console.log(res);

    console.table(res);
    manage()
})


};

const byDepartmentView = () =>{
    connection.query('SELECT * FROM department', (err, name) =>{
        // console.log(name[1].name);
        if (err)
        throw err;
        inquire.prompt({
            name: 'Department',
            type: 'list',
            message: 'Choose a department',
            choices: function() {
                let array = [];
                for(let i = 0; i < name.length; i++){
                    array.push({
                        name: name[i].name,
                        value: name[i].id
                    });
                }        
                // console.log(choice);
                return array;
            }
        })
        .then(answer =>{
            // console.log(answer);
            const qString = `SELECT employee.first_name,
            employee.last_name,
            employee.id,
            employee.role_id,
            r.department_id,
            r.title
            FROM employee INNER JOIN roles r ON r.id = employee.role_id
            INNER JOIN department ON r.department_id = department.id
            where department.id = ?`;
            connection.query(qString, [answer.Department], (err, res) => {
                if (err) throw err;
                console.table(res);
                manage()
            })
        });
    })
   
};

const byManagerView = () =>{
    connection.query(`SELECT * FROM employee WHERE manager_id is null`, (err, res) =>{
       
        if (err)
        throw err 
        inquire.prompt({
            name: 'Manager',
            type: 'list',
            message: 'choose a manager',
            choices: function(){
                let arr =  res.map(function(employee){
                    return {name: employee.first_name +' '+ employee.last_name,
                    value: employee.id};
                });

                

                return arr;
            }

  
        })
        .then(answer =>{
            const qString = `SELECT employee.first_name,
            employee.last_name,
            employee.id,
            employee.role_id,
            employee.manager_id,
            r.title
            FROM employee INNER JOIN roles r ON r.id = employee.role_id
            WHERE manager_id = ?`
            connection.query(qString, [answer.Manager], (err, res) =>{
                if (err)
                throw err
                console.table(res);
                manage()
            });
        })
    })
};

const addEmployee = () =>{

};

const removeEmployee = () =>{

};

const updateRole = () =>{

};

const updateManger = () =>{

};

