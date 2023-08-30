// O mircro framework Express transforma app em servidor HTTP

// Importa o express
const express = require('express');


const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "jornada-backend-agosto-23";
const client = new MongoClient(url);

async function main() {
    console.info("Conectando ao banco de dados...");
    await client.connect();
    console.info("Banco de dados conectado com sucesso!");

    const db = client.db(dbName);
    const collection = db.collection("podcasts");

    // Aplicação utilizando express
    const app = express();

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
    app.get("/podcasts", async function(req, res){
        
        const itens = await collection.find().toArray();
        
        res.send(itens);
    });

    // Create -> [POST] /podcasts
    app.post("/podcasts", function (req, res){
        //console.log(req.body, typeof req.body);
        
        // Extraindo o nome do Body da Request (Corpo da Requisição)
        const item = req.body.nome;

        // Inserindo o item na lista
        lista.push(item);

        // Enviando uma resposta de sucesso
        res.send("Item criado com sucesso");

    });

    // Read By Id -> [GET] /podcasts/:id
    app.get("/podcasts/:id", function (req, res){
        // Pegando o parâmetro de rota ID
        const id = req.params.id - 1;

        // Pegando a informação da lista
        const item = lista[id];

        // Exibindo o item na resposta do endpoint
        res.send(item);
    });

    // Update -> [PUT] /podcasts/:id
    app.put("/podcasts/:id", function (req, res){
        // Pegando o parâmetro de rota ID
        const id = req.params.id - 1;

        // Extraindo o nome do Body da Request (Corpo da Requisição)
        const item = req.body.nome;

        // Atualizando a informação na lista de registros
        lista[id] = item;

        res.send("Item editado com sucesso!");
    })

    // Delete -> [DELETE] /podcasts/:id
    app.delete("/podcasts/:id", function (req, res){
        // Pegando o parâmetro de rota ID
        const id = req.params.id - 1;

        // Excluindo o item da lista
        delete lista[id];

        res.send("Item excluído com sucesso!");
    });

    // Aplicação ouvindo na porta 3000
    app.listen(3000);

}

main();