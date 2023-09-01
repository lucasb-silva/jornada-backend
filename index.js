// Importa o dotenv
require("dotenv").config();

// O mircro framework Express transforma app em servidor HTTP

// Importa o express
const express = require('express');
// Importa o mongodb
const { MongoClient, ObjectId } = require("mongodb");


const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

//const url = "mongodb://127.0.0.1:27017";
const url = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}`;
const client = new MongoClient(url);

async function main() {
    // Devido a demora na conexão utilizamos uma Promisse (async/await)
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
    app.post("/podcasts", async function (req, res){
        //console.log(req.body, typeof req.body);
        
        // Extraindo o nome do Body da Request (Corpo da Requisição)
        const item = req.body;

        // Inserindo o item na collection
        await collection.insertOne(item);        

        // Enviando uma resposta de sucesso
        res.send(item);

    });

    // Read By Id -> [GET] /podcasts/:id
    app.get("/podcasts/:id", async function (req, res){
        // Pegando o parâmetro de rota ID
        const id = req.params.id;

        // Pegando a informação da collection
        const item = await collection.findOne({
            _id: new ObjectId(id)
        })

        // Exibindo o item na resposta do endpoint
        res.send(item);
    });

    // Update -> [PUT] /podcasts/:id
    app.put("/podcasts/:id", async function (req, res){
        // Pegando o parâmetro de rota ID
        const id = req.params.id;

        // Extraindo o nome do Body da Request (Corpo da Requisição)
        const item = req.body;

        // Atualizando a informação na collection
        await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: item }
        );

        res.send(item);
    })

    // Delete -> [DELETE] /podcasts/:id
    app.delete("/podcasts/:id", async function (req, res){
        // Pegando o parâmetro de rota ID
        const id = req.params.id;

        // Excluindo o item da collection
        await collection.deleteOne({ _id: new ObjectId(id) })

        res.send("Item excluído com sucesso!");
    });

    // Aplicação ouvindo na porta 3000
    app.listen(process.env.PORT || 3000);

}

main();