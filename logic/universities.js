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
    /**
     * Get all the universities
     * @param {*} req 
     * @param {*} res 
     */
    getListUniversities(req, res)
    {
        conn.then(client => {
            client.db(databaseName).collection("universidades").find({})
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
     * Get an university by its name or nickname
     * @param {*} req 
     * @param {*} res 
     */
    getUniversity(req,res)
    {
        let n = req.params.username;
        let nUppercased = n.toUpperCase();
        conn.then(client => {
            client.db(databaseName).collection("universidades").find({$or : [{nombre : nUppercased}, {nickname : nUppercased}]})
            .toArray((err,data)=> {
                if(err) {
                    res.status(500).send('El servidor está caído, intente más tarde.');
                    throw err;
                }
                res.send(data);
            })
        });
    }
    /**
     * Get all the programs of an university
     * @param {*} req 
     * @param {*} res 
     */
    getProgramsOfUniversity(req,res)
    {
        let n = req.params.username;
        let nUppercased = n.toUpperCase();
        conn.then(client => {
            client.db(databaseName).collection("universidades").find({$or : [{nombre : nUppercased}, {nickname : nUppercased}]})
            .toArray((err,data)=> {
                if(err) {
                    res.status(500).send('El servidor está caído, intente más tarde.');
                    throw err;
                }
                else if(data.lenght > 0)
                {
                    client.db(databaseName).collection("programas").find({_id : {$in : data[0].programas }})
                    .toArray((err,data) => {
                        if(err) {
                            res.status(500).send('El servidor está caído, intente más tarde.');
                            throw err;
                        }
                        res.send(data);
                    })
                }
                else
                {
                    res.send([]);
                }
            })
        });

    }
}
module.exports = Universities;