
const express = require('express')
const bodyparser = require('body-parser')
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('lesson1.db', function(error){
  if(error){
    console.log("Failed to connect to db")
    console.log(error.message);
  }else{
    console.log("Connected to db");
  }
})

const app = express()
app.use(bodyparser.json());//tell the app to use bodyparser's json for parsing

const port = process.env.PORT || 4000

const { users } = require('./state');
const { json } = require('body-parser');

app.get("/testdb", function(req,res){
  console.log("Inside GET /testdb route");
  //some code in here to issue this command to the database
  //and return the results
  
  let sql = 'SELECT * from users';
  
  db.each(sql, function(error, row){
    console.log("Results from the DB =", row);
  })

  res.json("success")
})




/* BEGIN - create routes here */
app.get("/users", function (req, res) {
  console.log("inside my GET /users route");
  // console.log("request =", req);
  console.log("currents users", users);
  res.json(users)
})

app.get("/users/:id", function (req, res) {
  console.log("inside my GET/user/:id route", req.params.id);

  let idToLookFor = req.params.id;
  //loop through the users array,
  //and find the user with correct id
  let user = users.find(function (element) {
    if (element._id == idToLookFor) {
      return element;
    }
  })
  res.json(user); // return the found user
})

//NEED HELP ON THIS ONE
//POST /users
app.post("/users", function (req, res) {
  console.log("inside my POST /users route");
  console.log("inside my POST/ users route ", req.body);
  //now that we have the json that was sent
  //add ad id attrribute to it
  //and add it to the users array
  users.push(req.body);
  res.json(users);
})


//PUT /users/:id
//you want to update an existing user
//with the body that was passed in
//NOTE: make sure that if an id attribute is added in the body
//that you replace it with the id from the route
app.put("/users/:id", function (req, res) {
  console.log("inside my PUT /users/:id route", req.params.id)
  let updUser = {
    _id: req.params.id,
    name: req.body.name,
    occupation: req.body.occupation
  }
  const foundId = users.some(user => user._id == req.params.id) //does the user's params exist in the database? Need to find the id in the database. 
  if (foundId) {
    console.log("did you find the id? answer is", foundId)
    users.splice(req.params.id + 1, 1, updUser)
  }
  res.json(updUser); // return the found user
})


//NEED TO TRY THIS ONE AGAIN
//DELETE /users/:id
app.delete("/users/:id", function (req, res) {
  console.log("inside my DELETE /users/:id route", req.params.id);
  //for the user with the matching id
  const foundId = users.some(user => user._id == req.params.id) //does the user's params exist in the database? Need to find the id in the database. 
  if (element._id == foundId) {
    return element;
  }
  //add an "active" attribute, and set it to false
  user.isActive = false;

  res.json(user);

})


/* END - create routes here */

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`))