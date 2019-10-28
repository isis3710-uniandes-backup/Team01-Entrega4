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
                    throw err;
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
                    throw err;
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
          let program =  client.db(databaseName).collection("programas").findOne({nombre : nombrePrograma});
          if(program.universidades.length > 0)
          {
              conn.then(client => {
                  client.db(databaseName).collection("universidades").find({_id : {$in : program.universidades}})
                  .toArray((err,data) => {
                    if(err) {
                        res.status(500).send('El servidor está caído, intente más tarde.');
                        throw err;
                    }
                    res.send(data);
                  })
              })
          }
          else{
              res.send([]);
          }
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
                        "nombre" : "$nombre",
                        "universidades" : "$universidades"
                    }}
                }
            }]).toArray((err,docs) => {
                if(err)
                {
                    res.status(500).send('El servidor está caído, intente más tarde.');
                    throw err;
                }
                res.send(docs);
            });
            /* .toArray((err,data) => {
                if(err) {
                    res.status(500).send('El servidor está caído, intente más tarde.');
                    throw err;
                } */
                /* const clusteringByAreas = new Map();
                data.forEach( item => {
                    const listOfPrograms = clusteringByAreas.get(item.area);
                    if(!listOfPrograms)
                    {
                        clusteringByAreas.set(item.area, [item]);
                    }
                    else
                    {
                        let nuevisinho = [...listOfPrograms];
                        nuevisinho.push(item);
                        clusteringByAreas.set(item.area, nuevisinho);
                    }
                });
               let iterableOfMap =  clusteringByAreas.entries();
               let itemIte = null;
               let dataTransf;
               while(itemIte !== undefined)

               {
                   itemIte =  iterableOfMap.next().value;
                   dataTransf = {
                       area : itemIte[0],
                       programas : itemIte[1]
                   }
               }
                res.send(dataTransf); */
            });
    }

}
module.exports = Programs;