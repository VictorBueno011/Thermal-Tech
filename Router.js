const express = require("express")
const router = express.Router()
const path = require("path")
const novoEquip = require('../Thermal-Tech/database/db');
const novoSetor = require('../Thermal-Tech/database/db');
const novoTec = require('../Thermal-Tech/database/db');
const novoTipo = require('../Thermal-Tech/database/db');
const dados = require('../Thermal-Tech/database/db');
const { error } = require("console");
const db = require("./database/cnx")

router.use(express.static(path.join(__dirname, "/public")));

let user = { name: 'vini', tel: '4444' }


router.get("/cadastro", async function (req, res) {
    try {
        let tabelaSetor;
        let tabelaTec; 
        let tabelaEquip;  // Declare a variável fora da função

        async function listarDados() {
            const sqlSetor = "select * from setor";
            const sqlTec = "select * from tecnicos";
            const sqlEquip = "select * from tipos_arcondicionado";
            tabelaSetor = await db.query(sqlSetor);
            tabelaTec = await db.query(sqlTec);
            tabelaEquip = await db.query(sqlEquip); // Atribua o valor dentro da função
            console.log(tabelaTec.rows)
        }

        await listarDados(); // Espere até que a função listarDados seja concluída

        res.render('user', { setores: tabelaSetor.rows,tipo:tabelaEquip.rows, tecnicos:tabelaTec.rows}); // Agora a variável tabela está acessível aqui
    } catch (error) {
        res.status(500).send("Erro ao buscar os dados da tabela setor: " + error.message);
    }
});

router.get("/inicio", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/pages/home.html"))
})
// router.get('/teste', function (req, res) {
//     res.render('user')
// })

router.get("/equipamentos", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/pages/lista.html"))
})

router.post('/cadastro/equipamento', function (req, res) {
    novoEquip.insertEquip(req.body.tag, req.body.tipo, req.body.modelo, req.body.ns, req.body.area, req.body.local, req.body.setor, req.body.desc).then(function () {
        res.sendFile(path.join(__dirname, "./public/pages/lista.html"))
    }).catch(function (error) {
        res.send("deu erro " + error)
    })
})
router.post('/cadastro/setor', function (req, res) {
    novoSetor.insertSetor(req.body.nome_setor).then(function () {
        res.redirect('/cadastro')
    }).catch(function (error) {
        res.send("deu erro " + error)
    })
})
router.post('/cadastro/tecnico', function (req, res) {
    novoTec.insertTecnico(req.body.nome_tec, req.body.mat_tec, req.body.email_tec).then(function () {
        res.redirect('/cadastro')
    }).catch(function (error) {
        res.send("deu erro " + error)
    })
})
router.post('/cadastro/tipo', function (req, res) {
    novoTipo.insertTipo(req.body.nome_tipo).then(function () {
        res.redirect('/cadastro')
    }).catch(function (error) {
        res.send("deu erro " + error)
    })
})
router.get("/manutencao", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/pages/manut.html"))
})
router.get("/ordem", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/pages/ordem.html"))
})
router.get("/chamados", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/pages/chamado.html"))
})
router.get("/registro", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/pages/cadastro.html"))
})
router.get("/relatorio", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/pages/horas.html"))
})
router.get("/graficos", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/pages/horas.html"))
})
router.get("/chat", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/pages/chat.html"))
})
router.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/Login_v1/index.html"))
})


module.exports = router