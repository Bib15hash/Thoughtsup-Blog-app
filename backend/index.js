require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const routes = require('./routes/routes');

const app = express();

// app.use(express.static(__dirname + '/public'));
app.use('/public',express.static('public'))
app.use(bodyParser.json());
app.use(cors());
app.use('/',routes);


mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("DB is connected");
    },
    (err) => {
      console.log("DB is not connected.");
    }
  );


const PORT = 8000;

app.listen(PORT, (req,res) => {
    console.log(`Server started at port ${PORT}`)
})