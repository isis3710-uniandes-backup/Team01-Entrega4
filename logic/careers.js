const mongoClient = require("mongodb").MongoClient;
var ObjectId = require('mongodb').ObjectId;
const { databaseUser, databasePassword, databaseName } = require('../config');
const uri = "mongodb+srv://" + databaseUser + ":" + databasePassword + "@educapp-viylh.gcp.mongodb.net/test?retryWrites=true&w=majority";
let conn = mongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
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
    getCareer(req, res) {
        let universidad = req.params.nombreUniversidad;
        let programa = req.params.nombrePrograma;
        console.log(universidad + "   " + programa);
        conn.then(client => {
            client.db(databaseName).collection("universidades").findOne({ $or: [{ nombre: universidad }, { nickname: universidad }] }, (err, result) => {
                if (err) {
                    res.send(err);
                }
                if (result) {
                    let universityId = result._id;
                    client.db(databaseName).collection("programas").findOne({ nombre: programa }, (err, resultPro) => {
                        if (err) {
                            res.send(err);
                        }
                        let programId = resultPro._id;
                        client.db(databaseName).collection("carreraUniversidad").findOne({ $and: [{ universidad: universityId }, { programa: programId }] }, (err, resultado) => {
                            if(err){
                                res.send(err);
                            }
                            res.send(resultado);
                        });

                    });
                }
                else
                {
                    res.send("Sin resultados");
                }
            });
        })
            .catch(e => {
                res.status(500).send('Ocurrió un error en el servidor.');
            })
    }
    /**
     * Get the comments of an specific career
     * @param {*} req 
     * @param {*} res 
     */
    getComments(req, res) {
        let university = req.params.university;
        let program = req.params.program;
        conn.then(client => {
            let career = client.db(databaseName).collection("carreraUniversidad").findOne({ $and: [{ universidad: university }, { programa: program }] });
            let comments = career.comentarios;
            res.send(comments);
        })
            .catch(e => {
                res.status(500).send('Ocurrio un error');
            })
    }
    /**
     * Post a comment
     * @param {*} req 
     * @param {*} res 
     */
    postComment(req, res) {
        let comment = req.body;
        let university = req.params.nombreUniversidad;
        let program = req.params.nombrePrograma;
        conn.then(client => {
            client.db(databaseName).collection("universidades").findOne({ nombre: university}, (err, result) => {
                if (err) {
                    res.send(err);
                }
                if (result) {
                    let universityId = result._id;
                    client.db(databaseName).collection("programas").findOne({ nombre: program }, (err, resultPro) => {
                        if (err) {
                            res.send(err);
                        }
                        let programId = resultPro._id;
                        client.db(databaseName).collection("carreraUniversidad").updateOne({ $and: [{ universidad: universityId }, { programa: programId }] }, { $push: { comentarios: comment } }, (err, data) => {
                            if (err) {
                                res.status(400).send('No se pudo añadir su comentario');
                            }
                            else {
                                res.send(data);
                            }
                        });
                    });
                }
                else {
                    res.send("Sin resultados");
                }
            });
        })
    }

}
module.exports = Careers;
