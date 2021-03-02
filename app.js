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

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  initSystem()
});

 function initSystem(){
  inquirer
  .prompt({
    type: "list",
    name: "add",
    message: "Would you like to do?",
    choices: [
      "Add Department",
      "Add Role",
      "Add Employee",
      "View Employees by Department",
      'View Roles',
      "View Employees",
      "Update Employee Role",
    
      "End"]
  })
 
}
  
