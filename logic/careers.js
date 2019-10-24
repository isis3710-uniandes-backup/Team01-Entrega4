const mongoClient = require("mongodb").MongoClient;
var ObjectId = require('mongodb').ObjectId;
const { databaseUser, databasePassword, databaseName } = require('../config');
const uri = "mongodb+srv://"+databaseUser+":"+databasePassword+"@educapp-viylh.gcp.mongodb.net/test?retryWrites=true&w=majority";
let conn = mongoClient.connect(uri, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.catch(error => {
    //defined a response with an error to be shown 
});
class Careers {
    /**
     * Get an specific career
     * @param {*} req 
     * @param {*} res 
     */
    getCareer(req,res)
    {
        let university = req.params.university;
        let program = req.params.program;
        conn.then(client => {
            let university = new ObjectId(university);
            let program = new ObjectId(program);
           let career = client.db(databaseName).collection("carreraUniversidad").findOne({ $and : [{universidad : university},{programa : program}]});
           res.send(career);
        })
        .catch(e => {
            res.status(500).send('Ocurrio un error');
            throw e;
        })
    }
    /**
     * Get the comments of an specific career
     * @param {*} req 
     * @param {*} res 
     */
    getComments(req,res)
    {
        let university = req.params.university;
        let program = req.params.program;
        conn.then(client => {
           let career = client.db(databaseName).collection("carreraUniversidad").findOne({ $and : [{universidad : university},{programa : program}]});
           let comments = career.comentarios;
           res.send(comments);
        })
        .catch(e => {
            res.status(500).send('Ocurrio un error');
            throw e;
        })
    }

}
module.exports = Careers;