//imports 
const express = require("express") //requerindo express
require("dotenv").config() // Requerindo o dontenv para acessar a pasta .env
const mongoose = require("mongoose")

//Configuração
const porta = 3000 
const app = express()

//Conexao com o banco
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME
//`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@myfuckbanck.qdc0lgr.mongodb.net/${DB_NAME}`)
.then(()=> console.log("Conectado com o banco mogoose"))
.catch(()=> console.log("Erro ao conectar ao banco"))

console.log(process.env)

app.use(express.json())
//Medels
const Pessoa =mongoose.connection.model('pessoa', {nome: String})

app.post("/pessoa", async (req,res)=>{
const pessoa = new Pessoa(req.body)
const PessoaCriada = await pessoa.save()
res.status(201).json(PessoaCriada)
})

app.get("/pessoa", async (req,res)=>{
const pessoa =  await Pessoa.find()
res.json(pessoa)

})

app.delete('/pessoa/:id', async (req, res) => {
    await Pessoa.findByIdAndDelete(req.params.id)
    res.json({ mensagem: "Pessoa excluida com sucesso!" })
})

app.put('/pessoa/:id', async (req, res) => {
    const pessoaAtualizada = await Pessoa.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(pessoaAtualizada)
})


app.get('/pessoa/:id', async (req,res)=>{
   const pessoa = await Pessoa.findById(req.params.id)
    res.json(pessoa)




})


app.listen(porta, ()=>{console.log("Aplicação Rondando")})