const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const Tutorial = db.tutorials;


const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync({ force: false }).then(() => {
    console.log("database connected");
  });



app.post("/user" , (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Name can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    point = { type: 'Point', coordinates: [req.body.longitude,req.body.latitude]}
    const tutorial = {
      id:req.body.id,
      name: req.body.name,
      description: req.body.description,
      location: point,
      longitude : req.body.longitude,
      latitude : req.body.latitude,
      published: req.body.published ? req.body.published : false
        };
    

  
    // Save Tutorial in the database
    Tutorial.create(tutorial)
      .then(data => {
        res.send(`User Created with id : ${data.id} and name : ${data.name}`);
      })
      .catch(err => {
        console.log(err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });

   })

app.get("/findalluser" , (req, res) => {
   
    Tutorial.findAll({ })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  })

app.get("/finduser/:id", (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
});

app.put("/user/:id",(req, res) => {
  const id = req.params.id;

  Tutorial.update(
    // Set Attribute values 
         req.body ,
    // Where clause / criteria 
        { where:{id :id } }    
  
   ).then(user=>{
       res.send(`User updated successfully !!`);
   }).catch(err=>{
       res.send(err)
   })
})

app.delete("/user/:id", (req, res) => {
  

  Tutorial.destroy({ where:{id : req.params.id } } )
    .then(num => {
        res.send(`User with id: ${req.params.id} was deleted successfully!`)
      })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
});



// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});