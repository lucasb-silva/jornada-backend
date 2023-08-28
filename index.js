// O mircro framework Express transforma app em servidor HTTP

// Importa e cria uma aplicão usando express
const express = require('express')
const app = express()

// Criando o endpoint e retornando mensagem
app.get('/', function (req, res) {
  res.send('Hello World')
});

// Exercicio, criando novo endpoin 'oi'
app.get("/oi", function (req, res) {
    res.send('Olá, mundo')
});

// Aplicação ouvindo na porta
app.listen(3000)