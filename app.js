var mysql = require("mysql");
const inquirer = require("inquirer");


//Connection 
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employees_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  initSystem()
});

function initSystem() {
  inquirer
    .prompt({
      type: "list",
      name: "init",
      message: "Would you like to do?",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Departments",
        'View Roles',
        "View Employees",
        "Update Employee Role",

        "End"]
    }).then(function ({init}) {
      switch (init) {

        case "Add Department":
          addDepartment()
          break;

        case "Add Role":
          addRole()
          break;

        case "Add Employee":
          addEmployee()
          break;

        case "View Departments":
          viewDepartments()
          break;

        case "View Roles":
          viewRoles()
          break;

        case "View Employees":
          viewEmployees()
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

         default:
         connection.end()
         break;
      }
    })
}

function addDepartment() {
  console.log("Adding department\n");
  inquirer.prompt([{
      type: "input",
      name: "department",
      message: "What is the name of the new department that you want to add?"
  }, ]).then(function(res) {
      connection.query('INSERT INTO department (name) VALUES (?)', [res.department], function(err, data) {
          if (err) throw err;
          console.table("*New Department Added*");
          initSystem();
      })
  })
}

function addRole() {
  inquirer.prompt([
      {
          message: "Title of Role:",
          type: "input",
          name: "title"
      }, {
          message: "Salary for Role:",
          type: "number",
          name: "salary"
      }, {
          message: "Add department ID:",
          type: "number",
          name: "department_id"
      }
  ]).then(function (response) {
      connection.query("INSERT INTO roles (title, salary, department_id) values (?, ?, ?)", [response.title, response.salary, response.department_id], function (err, data) {
          console.table(data);
      })
      initSystem();
  })

}

function addEmployee() {
  inquirer.prompt([{
          type: "input",
          name: "first_name",
          message: "What is the employees first name?"
      },
      {
          type: "input",
          name: "last_name",
          message: "What is the employees last name?"
      },
      {
          type: "number",
          name: "role_id",
          message: "What is the employees role ID"
      },
      {
          type: "number",
          name: "manager_id",
          message: "What is the employees manager's ID?"
      }
  ]).then(function(res) {
      connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.first_name, res.last_name, res.role_id, res.manager_id], function(err, data) {
          if (err) throw err;
          console.table("*New Employee Added*");
          initSystem();
      })
  })
}

function viewDepartments() {
  connection.query("SELECT * FROM department", function (err, data) {
      console.table(data);
      initSystem();
  })
}

function viewRoles() {
  connection.query("SELECT * FROM role", function (err, data) {
      console.table(data);
      initSystem();
  })
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", function (err, data) {
      console.table(data);
      askQuestions();
  })
}