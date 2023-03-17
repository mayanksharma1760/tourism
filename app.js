const express=require("express");
const path = require("path");
const bodyparser = require("body-parser");
const app = express();
const mongoose = require('mongoose');
// const Customer = require("customer");
require("dotenv").config();

const port=process.env.PORT
const uri=process.env.DB_URL;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully.");
});






// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())


app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views'))

app.get('/',(req,res)=>{
    res.render('home.pug')
})
app.get('/contact',(req,res)=>{
    res.render('contact.pug')
})



// const Schema = mongoose.Schema;

// const Customer = mongoose.model("customer", customerSchema);

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    age: String,
    about: String
  });
var Contact = mongoose.model('traveller', contactSchema);
  app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send('This Item saved to  database')
    }).catch(()=>{
    res.status(400).send('item was not saved to the databse')
})
  }) 


  app.listen(port, function(){
    console.log(`Express server listening on ${port}`);
  });