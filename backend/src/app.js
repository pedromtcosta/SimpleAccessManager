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
    idUsuario: Sequelize.INTEGER,
    idPerfil: Sequelize.INTEGER,
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});

const PerfilSistema = sequelize.define("PerfilSistema", {
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
        }));
});

app.get('/api/sistema', function (req, res) {
    Sistema.findAll()
            .then((results) => {
                res.send(results);
            });
});

app.listen(3500, function () {
    console.log('Example app listening on port 3500!');
});