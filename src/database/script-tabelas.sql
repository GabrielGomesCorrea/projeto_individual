create database sustenstyle;
use sustenstyle;

create table marca(
	idMarca int primary key auto_increment,
    nome varchar(60),
    telefone varchar(13),
    email varchar(50),
    senha varchar(8)
);
select * from marca;

create table post(
	idPost int primary key auto_increment,
    fkMarca int,
    dtPost date,
    imagem_post varchar(255),
    constraint fkMarcaPost foreign key(fkMarca)
    references marca(idMarca)
);
select * from post;

select imagem_post from post order by idPost desc;

create table interacao(
	idInteracao int,
    fkPost int,
    fkMarcaCurtida int,
    dtCurtida date,
    constraint fkPostInteracao foreign key(fkPost)
    references post(idPost),
    constraint fkMarcaCurtidaLike foreign key(fkMarcaCurtida)
    references marca(idMarca)
);
select * from interacao;

SELECT fkPost, COUNT(idInteracao) AS qtdCurtida FROM interacao 
WHERE fkMarcaCurtida = 1 GROUP BY fkPost ORDER BY qtdCurtida DESC LIMIT 5;

select idPost, imagem_post from post order by idPost desc;