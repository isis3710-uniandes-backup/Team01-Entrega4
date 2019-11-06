var express = require('express');
var router = express.Router();
var middleware = require("../middleware.js");
var Universities = require("../logic/universities.js");
var Programs = require("../logic/programs.js");
var Usuarios = require("../logic/usuarios.js");
var Careers = require("../logic/careers.js");

//routes for universities
Universities = new Universities();
router.get('/universidades', middleware.checkToken , Universities.getListUniversities );
router.get('/universidades/:n', middleware.checkToken, Universities.getUniversity);
router.get('/universidades/:n/programas', middleware.checkToken, Universities.getProgramsOfUniversity);
//router for academic prroograms
Programs = new Programs();
router.get('/programas', middleware.checkToken, Programs.getPrograms);
router.get('/programas/area', middleware.checkToken, Programs.getProgramsClassifiedByArea);
router.get('/programas/area/:area', middleware.checkToken, Programs.getProgramsOfAarea);
router.get('/programas/:nombre', middleware.checkToken, Programs.getProgram);
router.get('/programas/:nombre/universidades', middleware.checkToken, Programs.getUniversitiesOfProgram);
//router for usuarios
Usuarios = new Usuarios();
router.get('/usuarios', middleware.checkToken, Usuarios.getUsers);
router.get('/usuarios/:username', Usuarios.getUser);
router.post('/usuarios/:username/comentarios', middleware.checkToken, Usuarios.postComment);
//router for careers
Careers = new Careers();
router.get('/carrera/:nombreUniversidad/:nombrePrograma/comentarios', middleware.checkToken, Careers.getComments);
router.get('/carrera/:nombreUniversidad/:nombrePrograma', Careers.getCareer);
router.post('/carrera/:nombreUniversidad/:nombrePrograma/comentarios', middleware.checkToken, Careers.postComment);
//login and register
router.post('/login', Usuarios.login);
router.post('/register', Usuarios.register);
module.exports = router;
