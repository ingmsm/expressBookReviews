const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username,password)=>{ //returns boolean
 let usuario= username
 let clave= password
 console.log(usuario,users,users.length)
 if (users.length === 0) {
//let users= [].concat(this.users)
 users.push({'username':usuario,'password':clave})
console.log(users,users[0].username)
}
else {
    for (let i= 0; i<users.length; i++) {
        //console.log(autores[i])
    if (users[i].username  === usuario ){
    let respuesta= Boolean(true)
    console.log('Usuario Igual')
    break;}
    
    else{
        let respuesta= Boolean(false)
        users.push({'username':usuario,'password':clave})
    console.log(users,'Usuario Diferente')
    break;
    }
}}

    //if(users.map(nombre=> nombre.username===usuario))}
 //
 
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
