// O mircro framework Express transforma app em servidor HTTP

// Importa e cria uma aplicão usando express
const express = require('express')
const app = express()

// Habilitamos o processamento de JSON
app.use(express.json());

// Criando o endpoint e retornando mensagem
app.get('/', function (req, res) {
  res.send('Hello World')
});

// Exercicio, criando novo endpoin 'oi'
app.get("/oi", function (req, res) {
    res.send('Olá, mundo')
});

// Endpoint podcasts
const lista = ["DevPira", "Hipsters.Tech", "Nerdcast"];

// Read All -> [GET] /podcasts
app.get("/podcasts", function(req, res){
    res.send(lista);
});

// Create -> [POST] /podcasts
app.post("/podcasts", function (req, res){
    //console.log(req.body, typeof req.body);
    
    // Extrai o nome do Body da Request (Corpo da Requisição)
    const item = req.body.nome;

    // Inserir o item na lista
    lista.push(item);

    // Enviamos uma resposta de sucesso
    res.send("Item criado com sucesso");

});

// Aplicação ouvindo na porta 3000
app.listen(3000)