const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
        const nombre_usuario=req.body.username
    if (nombre_usuario === ""){
        return res.send("The username is not provided, try another")
    }
    const clave_usuario=req.body.password

    if (clave_usuario === ""){
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
  //console.log(nombre_usuario,clave_usuario)

});


public_users.get('/usuario',function (req, res) {
 
    return res.send(JSON.stringify({users}, null, 2));
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
 
  return res.send(JSON.stringify({books}, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn
  return res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author1 = req.params.author
    let autores= Object.values(books)
    let booksbyauthor = [];
    for (let i= 0; i<autores.length; i++) {
        //console.log(autores[i])
    if (autores[i].author  === author1 ) {
        elemento= {'isbn':(i+1)}
        let autor=autores[i];
        console.log(autor.author)
        let book_by_autor_final={'isbn':(i+1),'title':autor.title,'reviews':autor.reviews}
        console.log(book_by_autor_final)
        booksbyauthor = [...booksbyauthor, book_by_autor_final];
    }
}

  return res.send(JSON.stringify({booksbyauthor}, null, 4));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title1 = req.params.title
    let titles= Object.values(books)
    let booksbytitle = [];
    for (let i= 0; i<titles.length; i++) {
        //console.log(autores[i])
    if (titles[i].title  === title1 ) {
        elemento= {'isbn':(i+1)}
        let titulo=titles[i];
        console.log(titulo.author)
        let book_by_title={'isbn':(i+1),'author':titulo.author,'reviews':titulo.reviews}
        console.log(book_by_title)
        booksbytitle = [...booksbytitle, book_by_title];
    }
}

  return res.send(JSON.stringify({booksbytitle}, null, 4));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn
    let review= books[isbn]
    let reviews = review.reviews
  return res.send(reviews);
});

module.exports.general = public_users;
