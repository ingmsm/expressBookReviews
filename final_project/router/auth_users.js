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

//Prueba para agregar review por usuario

let users_tokens = [];

//only registered users can login
regd_users.post("/login", (req,res) => {
  let username = req.body.username;
    if (!username) {
        return res.status(404).json({ message: "Body Empty" });
    }
    let password = req.body.password;
    if (!password) {
        return res.status(404).json({ message: "Body Empty" });
    }
    console.log(users)
    if (users.length===0){ res.send("There are not Users in DB")}
    else{
    for (let i= 0; i<users.length; i++) {
        console.log(users[i])
    if (users[i].username  === username && users[i].password  === password ){
     ingreso_valido= Boolean(true)
    break;}
    
    else{
        ingreso_valido= Boolean(false)
        }}}
        
    if (ingreso_valido ===false){
        return res.send("Username or Password is incorrect Please Check")
    }
    // Generate JWT access token
    let accessToken = jwt.sign({
        data: username
    }, 'access', { expiresIn: 60 * 60 });
    // Store access token in session
    req.session.authorization = {
        accessToken,username

        
    }
    users_tokens.push({"username":username, "token": accessToken })
    console.log(users_tokens)
    return res.status(200).send("Customer successfully logged in");

});

let users_review=[];
// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
const isbn = req.params.isbn;

  let filtered_book = books[isbn];

  if (filtered_book) {
    let review = req.query.review;
    let reviewer = req.session.authorization['username'];

    if (review) {
      filtered_book['reviews'][reviewer] = review;
      books[isbn] = filtered_book;

      res.send(
        `The review for the book with ISBN ${isbn} has been added/updated.`
      );
    }
  } else {
    res.send("Unable to find this ISBN!");
  }
});


// Add this route DELETE 
// Deleting a book review

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    let reviewer = req.session.authorization['username'];
    let filtered_review = books[isbn]["reviews"];
    if (filtered_review[reviewer]){
        delete filtered_review[reviewer];
        res.send(`Review for the ISBN ${isbn} posted by the user ${reviewer} deleted.`);
    }
    else{
        res.send("Can't delete, as this review has been posted by a different user");
    }
    });


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
