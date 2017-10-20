var cors = require('cors');
var bodyParser = require('body-parser');
var express = require("express");

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

var app = express();
app.use(cors());

const Sequelize = require('sequelize');
const sequelize = new Sequelize('SimpleAccessManager', 'root', '....', {
    host: 'localhost',
    dialect: 'mysql'
});

const Sistema = sequelize.define("Sistema", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    nome: Sequelize.STRING,
    descricao: Sequelize.STRING,
    ativo: Sequelize.BOOLEAN
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});

const Perfil = sequelize.define("Perfil", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    nome: Sequelize.STRING,
    ativo: Sequelize.BOOLEAN
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});

const Usuario = sequelize.define("Usuario", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    nome: Sequelize.STRING,
    email: Sequelize.STRING,
    cpf: Sequelize.STRING,
    telefone: Sequelize.STRING,
    ativo: Sequelize.BOOLEAN
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});

const UsuarioPerfil = sequelize.define("UsuarioPerfil", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    idUsuario: Sequelize.INTEGER,
    idPerfil: Sequelize.INTEGER,
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});

const PerfilSistema = sequelize.define("PerfilSistema", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    idPerfil: Sequelize.INTEGER,
    idSistema: Sequelize.INTEGER,
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/api/sistema', jsonParser, function (req, res) {
    const sistema = req.body;
    sequelize.sync()
        .then(() => Sistema.create({
            nome: sistema.nome,
            descricao: sistema.descricao,
            ativo: true
        }).then(() => res.send()));
});

app.put('/api/sistema', jsonParser, function (req, res) {
    const sistema = req.body;
    sequelize.sync()
        .then(() => Sistema.update({
            nome: sistema.nome,
            descricao: sistema.descricao,
            ativo: true
        }, { where: {id: sistema.id} }).then(() => res.send()));
});

app.get('/api/sistema', function (req, res) {
    Sistema.findAll()
            .then((results) => {
                res.send(results);
            });
});

app.get('/api/sistema/:id', function (req, res) {
    Sistema.findById(req.params.id)
            .then((result) => {
                res.send(result);
            });
});

app.put('/api/perfil', jsonParser, function (req, res) {
    const perfil = req.body;
    sequelize.sync()
        .then(() => Perfil.update({
            nome: perfil.nome,
            ativo: true
        }, { where: {id: perfil.id} }).then(() => {
            PerfilSistema.destroy({ where: { id: perfil.id } })
                .then(() => {
                    for (i = 0; i < perfil.sistemas.length; i++) {
                        var sistema = perfil.sistemas[i];
                        if (sistema.permissao) {
                            PerfilSistema.create({
                                idPerfil: perfil.id,
                                idSistema: sistema.id
                            })
                        }
                    }
                });
        }).then(() => res.send()));
});

app.post('/api/perfil', jsonParser, function (req, res) {
    const perfil = req.body;
    sequelize.sync()
        .then(() => Perfil.create({
            nome: perfil.nome,
            ativo: true
        }).then(result => {
            for (i = 0; i < perfil.sistemas.length; i++) {
                var sistema = perfil.sistemas[i];
                if (sistema.permissao) {
                    PerfilSistema.create({
                        idPerfil: result.id,
                        idSistema: sistema.id
                    })
                }
            }
        }).then(() => res.send()));
});

app.get('/api/perfil', function (req, res) {
    Perfil.findAll()
            .then((results) => {
                res.send(results);
            });
});

app.get('/api/perfil/:id', function (req, res) {
    Perfil.findById(req.params.id)
            .then((result) => {
                res.send(result);
            });
});

app.put('/api/usuario', jsonParser, function (req, res) {
    const usuario = req.body;
    sequelize.sync()
        .then(() => Usuario.update({
            nome: usuario.nome,
            email: usuario.email,
            cpf: usuario.cpf,
            telefone: usuario.telefone,
            ativo: true
        }, { where: {id: usuario.id} }).then(() => {
            UsuarioPerfil.destroy({ where: { idUsuario: usuario.id } })
                    .then(() => {
                        for (i = 0; i < usuario.perfis.length; i++) {
                            var perfil = usuario.perfis[i];
                            if (perfil.permissao) {
                                UsuarioPerfil.create({
                                    idUsuario: usuario.id,
                                    idPerfil: perfil.id
                                })
                            }
                        }
                    })
        }).then(() => res.send()));
});

app.post('/api/usuario', jsonParser, function (req, res) {
    const usuario = req.body;
    sequelize.sync()
        .then(() => Usuario.create({
            nome: usuario.nome,
            email: usuario.email,
            cpf: usuario.cpf,
            telefone: usuario.telefone,
            ativo: true
        }).then(result => {
            for (i = 0; i < usuario.perfis.length; i++) {
                var perfil = usuario.perfis[i];
                if (perfil.permissao) {
                    UsuarioPerfil.create({
                        idUsuario: result.id,
                        idPerfil: perfil.id
                    })
                }
            }
        }).then(() => res.send()));
});

app.get('/api/usuario', function (req, res) {
    Usuario.findAll()
            .then((results) => {
                res.send(results);
            });
});

app.get('/api/usuario/:id', function (req, res) {
    Usuario.findById(req.params.id)
                .then((result) => {
                    res.send(result);
                });
});

app.get("/api/perfil/:id/sistemas", function(req, res) {
    PerfilSistema.findAll({ where: { idPerfil: req.params.id } })
                    .then(acessos => {
                        Sistema.findAll()
                            .then(sistemas => {
                                var permissoes = [];
                                for (var s of sistemas) {
                                    permissoes.push({ id: s.id, nome: s.nome, permissao: false });
                                }
                                for (a of acessos) {
                                    var permissao = permissoes.filter(p => p.id === a.idSistema)[0];
                                    permissao.permissao = true;
                                }
                                res.send(permissoes);
                            });
                    });
});

app.get("/api/usuario/:id/perfis", function(req, res) {
    UsuarioPerfil.findAll({ where: { idUsuario: req.params.id } })
                    .then(acessos => {
                        Perfil.findAll()
                            .then(perfil => {
                                var permissoes = [];
                                for (var p of perfil) {
                                    permissoes.push({ id: p.id, nome: p.nome, permissao: false });
                                }
                                for (a of acessos) {
                                    var permissao = permissoes.filter(p => p.id === a.idPerfil)[0];
                                    permissao.permissao = true;
                                }
                                res.send(permissoes);
                            });
                    });
});

app.listen(3500, function () {
    console.log('Example app listening on port 3500!');
});