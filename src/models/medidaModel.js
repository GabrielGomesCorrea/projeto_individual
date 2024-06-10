var database = require("../database/config");

function buscarUltimasMedidas(idMarca, limite_linhas) {

    var instrucaoSql = `SELECT 
                        COUNT(idInteracao) AS qtdCurtida,
                        dtCurtida
                    FROM 
                        interacao 
                    WHERE 
                        fkMarcaCurtida = ${idMarca} 
                    GROUP BY 
                        dtCurtida 
                    ORDER BY 
                        qtdCurtida DESC 
                    LIMIT ${limite_linhas};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas
}
