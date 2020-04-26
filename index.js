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

connection.connect(function (err) {
    if (err) throw err;
    console.log('connection success');
});

const manage = () => {
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
        .then(function (respone) {
            switch (respone.Manage) {
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
                    addEmployee()
                    break;
                case 'Remove employee':
                    removeEmployee()
                    
                    break;
                case 'Update employee\'s role':
                    updateRole()
                    break;
                case 'Update employee\'s manager':
                    updateManger()
                    
                    break;
                case 'Exit':
                    connection.end();
                    break;

            }
        });
};

manage()
// View all employees
const employeeView = () => {

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


    connection.query(qString, function (err, res) {
        if (err) throw err;

        // console.log('hello')
        // console.log(res);

        console.table(res);
        manage()
    })


};

const byDepartmentView = () => {
    connection.query('SELECT * FROM department', (err, name) => {
        // console.log(name[1].name);
        if (err)
            throw err;
        inquire.prompt({
            name: 'Department',
            type: 'list',
            message: 'Choose a department.',
            choices: function () {
                let array = [];
                for (let i = 0; i < name.length; i++) {
                    array.push({
                        name: name[i].name,
                        value: name[i].id
                    });
                }
                // console.log(choice);
                return array;
            }
        })
            .then(answer => {
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

const byManagerView = () => {
    connection.query(`SELECT * FROM employee WHERE manager_id is null`, (err, res) => {

        if (err)
            throw err
        inquire.prompt({
            name: 'Manager',
            type: 'list',
            message: 'choose a manager to view team.',
            choices: function () {
                let arr = res.map(function (employee) {
                    return {
                        name: employee.first_name + ' ' + employee.last_name,
                        value: employee.id
                    };
                });



                return arr;
            }


        })
            .then(answer => {
                const qString = `SELECT employee.first_name,
            employee.last_name,
            employee.id,
            employee.role_id,
            employee.manager_id,
            r.title
            FROM employee INNER JOIN roles r ON r.id = employee.role_id
            WHERE manager_id = ?`
                connection.query(qString, [answer.Manager], (err, res) => {
                    if (err)
                        throw err
                    console.table(res);
                    manage()
                });
            })
    })
};

const addEmployee = () => {
    connection.query(`SELECT * FROM employee WHERE manager_id is null`, (err, manager) => {
        if (err)
            throw err
        connection.query(`SELECT * FROM roles`, (err, res) => {
            if (err)
                throw err;
            connection.query(`SELECT * FROM employee`, (err, name) => {
                if (err)
                    throw err
                inquire.prompt([
                    {
                        name: 'firstName',
                        type: 'input',
                        message: 'What is the employee\'s first name?'
                    },
                    {
                        name: 'lastName',
                        type: 'input',
                        message: 'What is the employee\'s last name?'
                    },
                    {
                        name: 'role',
                        type: 'list',
                        message: 'What will be the employee\'s role?',
                        choices: function () {
                            let arr = res.map(function (role) {
                                return {
                                    name: role.title,
                                    value: role.id
                                }
                            })
                            return arr
                        }
                    },
                    {
                        name: 'eManager',
                        type: 'list',
                        message: 'Who will be the employee\'s manager?',
                        choices: function () {
                            let mArr = manager.map(function (eManage) {
                                return {
                                    name: eManage.first_name + ' ' + eManage.last_name,
                                    value: eManage.id
                                }
                            })
                            return mArr
                        }
                    },    
                ])
                .then(answer => {
                    const qString = `INSERT INTO employee
                    (first_name, last_name, role_id, manager_id)
                    VALUES
                    (?,?,?,?)`;
                    connection.query(qString, [answer.firstName, answer.lastName,answer.role,answer.eManager], (err, res) =>{
                        if (err)
                        throw err
                        console.log(`Employee has added.`)
                        manage()
                    })

                })


            })
        })
    })


};



const removeEmployee = () => {
    connection.query(`SELECT * FROM employee WHERE manager_id IS NOT NULL`, (err, res)=>{
        if (err)
        throw err
        inquire.prompt({
            name: 'remove',
            type: 'list',
            message: 'Select the employee you wish to remove.',
            choices: function(){
                let arr = res.map(function(remove){
                    return {
                        name: remove.first_name+' '+remove.last_name,
                        value: remove.id
                    }
                 })    

               
                return arr
            }
        })
        .then(answer =>{
            const qString = `DELETE FROM employee WHERE id = ?`
            connection.query(qString, [answer.remove], (err, name) =>{
                if (err)
                throw err 
                console.log('Employee has been removed.')
                manage()
            })
        })
       
    })
};

const updateRole = () => {
    connection.query(`SELECT * FROM roles`, (err, roles)=>{
        connection.query(`SELECT * FROM employee WHERE manager_id IS NOT NULL`, (err, res)=>{
            if (err)
            throw err

            inquire.prompt([
                {
                    name: 'uRole',
                    type: 'list',
                    message: 'Select an employee for role update.',
                    choices: function(){
                        const arr = res.map(function(roleU){
                            return {
                                name: roleU.first_name+' '+roleU.last_name,
                                value: roleU.id
                            }
                        })
                        return arr
                    }
                },
                {
                    name: 'newRole',
                    type: 'list',
                    message: 'Select a new role.',
                    choices: function(){
                        const rArr = roles.map(function(roleU1){
                            return{
                                name: roleU1.title,
                                value: roleU1.id
                            }
                        })
                        return rArr
                    }
                }    
            ])
            .then((answer) =>{
                const qString = `UPDATE employee SET role_id = ? WHERE id = ?`
                connection.query(qString, [answer.newRole, answer.uRole], (err, respone)=>{
                    if (err)
                    throw err
                    console.log('Employee\'s role has been updated.');
                    manage()
                })
            })
        })
    })    
};

const updateManger = () => {
    connection.query(`SELECT * FROM employee WHERE manager_id IS NOT NULL`, (err, res)=>{
        connection.query(`SELECT * FROM employee WHERE manager_id IS NULL`, (err, man) =>{
            if (err)
            throw err
            inquire.prompt([
                {
                    name: 'uManager',
                    type: 'list',
                    message: 'Select an employee for manager update.',
                    choices: function(){
                        const mArr = res.map(function(uMan){
                            return {name: uMan.first_name+' '+uMan.last_name,
                        value: uMan.id}
                        })
                        return mArr
                    }
                    
                },
                {
                    name: 'newManager',
                    type: 'list',
                    message: 'Select the employee\'s manager.',
                    choices: function(){
                        const arr = man.map(function(newMan){
                            return {name: newMan.first_name+' '+newMan.last_name,
                        value: newMan.id}
                        })
                        return arr
                    }
                }
                
            ])
            .then(function(answer){
                const qString = `UPDATE employee SET manager_id = ? WHERE id = ?`
                connection.query(qString, [answer.newManager, answer.uManager], (err, res)=>{
                    if (err)
                    throw err
                    console.log('Employee\'s manager has been updated.')
                    manage()
                })
            })
        })
        
    })

};

