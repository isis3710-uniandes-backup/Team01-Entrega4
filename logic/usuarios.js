let jwt = require('jsonwebtoken');
const mongoClient = require("mongodb").MongoClient;
const { databaseUser, databasePassword, databaseName, secretKey } = require('../config');
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
    /**
     * Sign up of an user
     * @param {*} req 
     * @param {*} res 
     */
    register(req,res)
    {
        let newUser = req.body;
        conn.then(client => {
            client.db(databaseName).collection("usuarios").insertOne(newUser, (err,data) => {
                if(err) 
                {
                    res.status(400).send('Inserción invalida. Revise los datos suministrados');
                    throw err;
                }
                res.send(data);
            })
        })
    }
    /**
     * Log in of an user
     * @param {*} req 
     * @param {*} res 
     */
    login(req, res)
    {
        let username = req.body._id;
        let password = req.body.password;

        conn.then(client => {
           client.db(databaseName).collection("usuarios").findOne({_id : username}, (err,data)=>{
            if(err){
                res.status(500).send('El servidor está caído, intente más tarde.');
                throw err;
            }
            if(data)
            {
                if(data.password ===  password)
                {
                   let newToken = jwt.sign({username : username },secretKey, {expiresIn : '3h'} );
                   //necesito investigar si desde aqui la cookie queda para el navegador del cliente
                   res.cookie('JSESSIONID', newToken, {httpOnly : true, secure : true});
                   res.send('Login existoso');
                }
                else
                {
                    res.status(400).send('Contraseña incorrecta');
                }
            }
            else
            {
                res.status(400).send('El usuario no existe');
            }
           });
        })
    }
}
module.exports = Usuarios;