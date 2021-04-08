const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

/* BEGIN - create routes here */

app.all("/",function(req,res){
  res.send('
  this backend can manage users using the following:
    GET /users          to get the list of all users
    GET /uses/{id}      to get a specific user by id
    PUT /users{id}      to update an existing user
    POST /users         to add a new user
    DELETE /users/{id}  to delete user
  ')
});

// app.get("/", function(req,res){
//   res.send("First Server Response")
// })
// //check in postman localhost:4000/
// app.post("/", function(req,res){
//   res.send("First Server Response but with a post")
// })


// app.get("/bye", function(req,res){
//   res.send("Bye Felicia")
// })
//check in postman localhost:4000/bye


/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))