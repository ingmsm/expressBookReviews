const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

function isValid  (username,password){ //returns boolean
 let usuario= username
 let clave= password
 //console.log(usuario,users,users.length)
 let respuesta= Boolean(false)
 if (users.length === 0) {
//let users= [].concat(this.users)
 users.push({'username':usuario,'password':clave})
  respuesta= Boolean(false)
  return(respuesta)
//console.log(users,users[0].username)
}
else {
    for (let i= 0; i<users.length; i++) {
        //console.log(autores[i])
    if (users[i].username  === usuario ){
     respuesta= Boolean(true)
    break;}
    
    else{
         respuesta= Boolean(false)

    }
}}

if (respuesta=== true){
    return(respuesta)
}
else {
    users.push({'username':usuario,'password':clave})
}
return (respuesta)
    //if(users.map(nombre=> nombre.username===usuario))}
 //
 
}


const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  let username = req.body.username;
    if (!username) {
        return res.status(404).json({ message: "Body Empty" });
    }
    // Generate JWT access token
    let accessToken = jwt.sign({
        data: username
    }, 'access', { expiresIn: 60 * 60 });
    // Store access token in session
    req.session.authorization = {
        accessToken
    }
    return res.status(200).send("Customer successfully logged in");

});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
