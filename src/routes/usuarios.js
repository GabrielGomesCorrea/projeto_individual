var express = require("express");
var router = express.Router();
const upload = require('../config/configUpload'); // ARQUIVO COM A CONFIGURAÇÃO DO UPLOAD

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    console.log("estou na rota");
    usuarioController.autenticar(req, res);
});

router.get("", (req, res) => {
  res.render("index")
});

// upload.single('foto') vai buscar no json alguma propriedade chamada foto 
router.post('/cadastro/:idMarca', upload.single('foto'), (req, res) => {
  usuarioController.salvar(req, res);
});

router.delete("/deletarCurtida/:idPost/:idMarca", function (req, res) {
  usuarioController.deletarCurtida(req, res);
});

router.post("/curtir/:idPost/:idMarca", function (req, res) {
  usuarioController.curtir(req, res);
});

router.post("/VerCurtida/", function (req, res) {
  console.log("TO NA ROTA")
  publiController.VerCurtida(req, res);

});

/*router.get('/:id', upload.single('foto'), (req, res) => {
  usuarioController.buscarUsuarioPeloId(req, res);
});*/

module.exports = router;