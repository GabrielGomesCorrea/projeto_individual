var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                                if (resultadoAutenticar.length > 0) {
                                    res.json({
                                        idMarca: resultadoAutenticar[0].idMarca,
                                        nome: resultadoAutenticar[0].nomeCadServer,
                                        telefone: resultadoAutenticar[0].telefoneCadServer,
                                        email: resultadoAutenticar[0].emailCadServer,
                                        senha: resultadoAutenticar[0].senhaCadServer
                                    });
                                }
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeCadServer;
    var telefone = req.body.telefoneCadServer;
    var email = req.body.emailCadServer;
    var senha = req.body.senhaCadServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua empresa está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, telefone, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function salvar(req, res) {
    const imagem = req.file.filename;
    const nome = req.params.idMarca;
  
    //const {nome, email} = req.body
  
    const usuario = { imagem, nome }
    
    usuarioModel.salvar(usuario)
    .then(resultado => {
      res.status(201).send("Usuario criado com sucesso");
    }).catch(err => {
      res.status(500).send(err);
    });
}

function deletarCurtida(req, res) {
    var idPost = req.params.idPost;
    var idMarca = req.params.idMarca

    usuarioModel.deletarCurtida(idPost, idMarca)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}


function curtir(req, res) {
    var idPost = req.params.idPost;
    var idMarca = req.params.idMarca;

    usuarioModel.curtir(idPost, idMarca)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao curtir o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function VerCurtida(req, res) {
    var idMarca = req.body.idMarcaServer;
    var idPost = req.body.idPostServer;


    console.log(`Id Marca: ${idMarca}; Id Publicacao: ${idPost}`)

    usuarioModel.VerCurtida(idPost, idMarca)
        .then(
            function (resultado) {
                console.log(resultado)
                if(resultado.length == 0){
                    res.json('nenhuma');
                }else
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro em achar as curtidas: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    autenticar,
    cadastrar,
    salvar,
    deletarCurtida,
    curtir,
    VerCurtida
}