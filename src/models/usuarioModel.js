var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idMarca, nome, telefone, email, senha FROM marca WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, telefone, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO marca (nome, telefone, email, senha) VALUES ('${nome}', '${telefone}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function salvar(usuario) {
    const instrucao = `insert into post (idPost, fkMarca, dtPost, imagem_post) values (default, '${usuario.nome}', now(), '${usuario.imagem}')`;
  
    return database.executar(instrucao);
}

function curtir(idPost, idMarca) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", idUsuario, idPublicacao);
    var instrucaoSql = `
        insert into interacao (idInteracao, fkPost, fkMarcaCurtida, dtCurtida) values (1, '${idPost}', '${idMarca}', now());
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarCurtida(idPost, idMarca) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idPublicacao, idUsuario);
    var instrucaoSql = `
        delete from interacao where fkPost = ${idPost} and fkMarca = ${idMarca};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function VerCurtida(idPost, idMarca) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function verCurtir(): ", idUsuario, idPublicacao);
    var instrucaoSql = `
    SELECT 
    *
    FROM
    interacao
        JOIN
    post ON interacao.fkPost = post.idPost
        JOIN
    marca ON interacao.fkMarcaCurtida = marca.idMarca
    where interacao.fkMarcaCurtida = ${idMarca} and interacao.fkPost = ${idPost};
    `;
    console.log(`Id marca: ${idMarca}; Id Publicacao: ${idPost}`);
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    salvar,
    curtir,
    deletarCurtida,
    VerCurtida
};