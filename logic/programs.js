const mongoClient = require("mongodb").MongoClient;
const { databaseUser, databasePassword, databaseName } = require('../config');
const uri = "mongodb+srv://"+databaseUser+":"+databasePassword+"@educapp-viylh.gcp.mongodb.net/test?retryWrites=true&w=majority";
let conn = mongoClient.connect(uri, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.catch(error => {
    console.log(error);
    //defined a response with an error to be shown 
});
class Programs
{
    /**
     * Get all the programs.
     * @param {*} req 
     * @param {*} res 
     */
    getPrograms(req,res)
    {
        conn.then(client => {
            client.db(databaseName).collection("programas").find({})
            .toArray((err,data) => {
                if(err) {
                    res.status(500).send('El servidor está caído, intente más tarde.');
                }
                res.send(data);
            })
        })
    }
    /**
     * Get all the programs of an specific area
     * @param {*} req 
     * @param {*} res 
     */
    getProgramsOfAarea(req,res)
    {
        let area = req.params.area;
        conn.then(client => {
            client.db(databaseName).collection("programas").find({area : area})
            .toArray((err,data) => {
                if(err) {
                    res.status(500).send('El servidor está caído, intente más tarde.');
                }
                res.send(data);
            })
        })
    }
    /**
     * Get the universities of an specific program
     * @param {*} req 
     * @param {*} res 
     */
    getUniversitiesOfProgram(req,res)
    {
        let nombrePrograma = req.params.nombre;
        conn.then(client => {
          client.db(databaseName).collection("programas").findOne({nombre : nombrePrograma}, (err,result) => {
              if(err)
              {
                  res.status(500);
              }
              console.log(result);
            if(result.universidades.length > 0)
            {
                conn.then(client => {
                    client.db(databaseName).collection("universidades").find({_id : {$in : result.universidades}})
                    .toArray((err,data) => {
                      if(err) {
                          res.status(500).send('El servidor está caído, intente más tarde.');
                      }
                      res.send(data);
                    })
                })
            }
            else{
                res.send([]);
            }
          });
          
        })
    }
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    getProgram(req,res)
    {
        let nombrePrograma = req.params.nombre;
        conn.then(client => {
           let theProgram = client.db(databaseName).collection("programas").findOne({nombre : nombrePrograma});
           res.send(theProgram);
        })
    }
    /**
     * Get the programs classified by area
     * @param {*} req 
     * @param {*} res 
     */
    getProgramsClassifiedByArea(req,res)
    {
        conn.then(client => {
          client.db(databaseName).collection("programas").aggregate([{
                "$group" : {
                    "_id" : "$area",
                    "programs" : {$push : {
                        "title" : "$nombre"
                    }}
                }
            }]).toArray((err,docs) => {
                if(err)
                {
                    res.status(500).send('El servidor está caído, intente más tarde.');
                }
                res.send(docs);
            });
        });
    }

}
module.exports = Programs;
