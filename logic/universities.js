var express = require('express');
var router = express.Router();
const mongoClient = require("mongodb").MongoClient;
const { databaseUser, databasePassword, databaseName } = require('../config');
const uri = "mongodb+srv://"+databaseUser+":"+databasePassword+"@educapp-viylh.gcp.mongodb.net/test?retryWrites=true&w=majority";
let conn = mongoClient.connect(uri, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.catch(error => {
    //defined a response with an error to be shown 
});
class Universities
{

}