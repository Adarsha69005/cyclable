const express = require('express');
const mongoose = require('mongoose');
const bodyPraser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const userRoutes = require('./routes/User');
const productRoutes = require('./routes/Product');
const locationRoutes = require('./routes/Location');
const app = express();

app.use(cors());

mongoose.connect('mongodb+srv://cyclable:cyclable@cluster0.nkpjk.mongodb.net/cyclable?retryWrites=true&w=majority');
mongoose.Promise = global.Promise;
app.use(bodyPraser.urlencoded({extended:true}));
app.use(bodyPraser.json());
app.use(express.static(__dirname+'/public'))
app.set('views',__dirname+'/views');

app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/location', locationRoutes);

app.use((req,res,next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
})


app.listen(9001,()=>{
    console.log("App running on port 9001");
  });




