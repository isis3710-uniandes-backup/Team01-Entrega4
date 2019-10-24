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
class Usuarios{
    /**
     * Get all the users of the database
     * @param {*} req 
     * @param {*} res 
     */
    getUsers(req,res){
        conn.then(client => {
            client.db(databaseName).collection("usuarios").find({})
            .toArray((err,data) => {
                if(err) {
                    res.status(500).send('El servidor está caído, intente más tarde.');
                    throw err;
                }
                res.send(data);
            })
        })
    }
    /**
     * Get an specific user by its username
     * @param {*} req 
     * @param {*} res 
     */
    getUser(req,res){
        let username = req.params.username;
        conn.then(client => {
            let user = client.db(databaseName).collection("usuarios").findOne({_id : username});
            res.send(user);
        })
    }
}
module.exports = Usuarios;