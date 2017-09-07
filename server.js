const express=require('express');
const looger=require('morgan');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const router=require('./routes/router');
const configs=require('./configs/config');

mongoose.connect(configs.mongooseurl);

const app=express();
app.use(looger('dev'));
app.use(bodyParser.json());
app.use('/',router);

module.exports=app;