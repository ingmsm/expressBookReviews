const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
    const nombre_usuario=req.body.username
    if (!nombre_usuario){
        return res.send("The username is not provided, try another")
    }
    const clave_usuario=req.body.password
    if (!clave_usuario){
        return res.send("The password is not provided, try another")
    }
    const respuesta= isValid(nombre_usuario,clave_usuario)
    if (respuesta === true) {
       return res.send("The user " + nombre_usuario +  " already exists, try another")
    }
    else {
        const response_1= {"message":"Customer succesfully registred. Now you can login"}
        return res.send(response_1); 
    }
});

public_users.get('/usuario',function (req, res) {
    return res.send(JSON.stringify({users}, null, 2));
});
// Get the book list available in the shop
public_users.get('/',function (req, res) {
  const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
      });
      get_books.then(() => console.log("Promise for Task 10 resolved"));
  });
// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn
  let booksPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(books[isbn]);
        }, 100)
    });
    booksPromise.then((data) => {
        //Condicional en caso de error
        if (data!== null){
        console.log("probando función Promise");
        res.send(data)}
        else {
            console.log("Observando el posible error")
            res.send(data);
        }
    })
    booksPromise.catch((error) => {
        console.log("observando el error")
        res.status(500).send(error,'Error getting books');
    });
});
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author1 = req.params.author
    let autores= Object.values(books)
    let booksbyauthor = [];
    for (let i= 0; i<autores.length; i++) {
    if (autores[i].author  === author1 ) {
        elemento= {'isbn':(i+1)}
        let autor=autores[i];
        console.log(autor.author)
        let book_by_autor_final={'isbn':(i+1),'title':autor.title,'reviews':autor.reviews}
        console.log(book_by_autor_final)
        booksbyauthor = [...booksbyauthor, book_by_autor_final];}}
let booksPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(booksbyauthor);
    }, 100)   });
booksPromise.then((booksbyauthor) => {
    console.log("probando función Promise");
    res.send(JSON.stringify({booksbyauthor}, null, 4));})
booksPromise.catch((error) => {
    console.log("observando el error")
    res.status(500).send(error,'Error getting books');});});
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title1 = req.params.title
    let titles= Object.values(books)
    let booksbytitle = [];
    for (let i= 0; i<titles.length; i++) {
    if (titles[i].title  === title1 ) {
        elemento= {'isbn':(i+1)}
        let titulo=titles[i];
        console.log(titulo.author)
        let book_by_title={'isbn':(i+1),'author':titulo.author,'reviews':titulo.reviews}
        console.log(book_by_title)
        booksbytitle = [...booksbytitle, book_by_title];}}
let booksPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(booksbytitle);
    }, 100)   });
booksPromise.then((booksbytitle) => {
    console.log("probando función Promise");
    res.send(JSON.stringify({booksbytitle}, null, 4));})
booksPromise.catch((error) => {
    console.log("observando el error")
    res.status(500).send(error,'Error getting books');});});
//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn
    let review= books[isbn]
    let reviews = review.reviews
  return res.send(reviews);
});
module.exports.general = public_users;
