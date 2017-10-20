drop database if exists SimpleAccessManager;

create database SimpleAccessManager;
use SimpleAccessManager;

create table Sistema (
	Id int primary key auto_increment,
    Nome varchar(50),
    Descricao varchar(500),
    Ativo bool
);

create table Perfil (
	Id int primary key auto_increment,
    Nome varchar(50),
    Ativo bool
);

create table Usuario (
	Id int primary key auto_increment,
    Nome varchar(50),
    Email varchar(100),
    Cpf varchar(20),
    Telefone varchar(20),
    Ativo bool
);

create table UsuarioPerfil (
	Id int primary key auto_increment,
	IdUsuario int,
    IdPerfil int,
    
    constraint UsuarioPerfil_PK primary key(IdUsuario, IdPerfil)
);

create table PerfilSistema (
	Id int primary key auto_increment,
    IdPerfil int,
    IdSistema int,
    
    constraint UsuarioPerfil_PK primary key(IdPerfil, IdSistema)
);