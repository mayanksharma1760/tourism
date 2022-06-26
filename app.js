const express=require('express');
const path = require("path");
const bodyparser = require("body-parser");
// const mongoose = require("mongoose");
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tourism');



const server = http.createServer(app);



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


var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    age: String,
    about: String
  });
var Contact = mongoose.model('tourist', contactSchema);

  app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send('This Item saved to  database')
    }).catch(()=>{
    res.status(400).send('item was not saved to the databse')
})
  })

  app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });