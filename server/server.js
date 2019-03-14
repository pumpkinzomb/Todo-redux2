const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
const router = express.Router();
const route = require('./route');

var mongodbUri ='mongodb://@' || process.env.MONGODB_URI;
mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  auth: {
    user: 'id',
    password: 'pw'
  }
});
var conn = mongoose.connection;    
conn.on('error',function (err) {  
    console.log('Mongoose default connection error: ' + err);
}); 
conn.once('open', () =>{
    console.log('Connected to a database');                   
});

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/todoList', {useNewUrlParser:true}).then(()=>{
//     console.log('Database is connected')
// }, err =>{
//     console.log('Can not connect to the databse'+err)
// });

route(router);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '/../build')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use('/api', router);
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => console.log(`Listening on port ${port}`));