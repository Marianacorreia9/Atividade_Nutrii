const express = require("express")
const consultas = require("../dados.json")

const calcularIMC = () => {
    consultas.forEach(c => {
        c.imc = (c.peso / (c.altura * c.altura)).toFixed(2)
    })
}

const mostrarConsultas = (req, res) => {
    calcularIMC()
    res.send(consultas)
}

const novaConsulta = (req, res) => {
    if (req.body) {
        consultas.push(req.body)
        res.send("Consulta recebida, em análise")
    } else {
        res.send("Erro ao receber consulta")
    }
}

const app = express()

app.use(express.urlencoded({ extended: true }))

const porta = 3000

app.post("/", novaConsulta)
app.get("/", mostrarConsultas)
app.delete("/:id", excluirPedido);
app.patch("/", atualizarPedido);

app.listen(porta, () => {
    console.log(`Paciente: http://127.0.0.1:5500/paciente/`)
    console.log(`Servidor: http://127.0.0.1:${porta}`)
})