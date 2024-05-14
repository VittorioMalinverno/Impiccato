const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("node:fs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const path = require('path');
const http = require('http');
app.use("/", express.static(path.join(__dirname, "public")));

//lista delle parole italiane
let lista_parole = [];

//recupero delle parole da file txt
fs.readFile("./lista_parole.txt", "utf8", (errore, dati) => {
    if (errore) throw errore;
    lista_parole = dati.split("\n");
});

//restituisci una parola random dalla lista
app.get("/parola", (req, res) => {
    const parola = lista_parole[Math.floor(Math.random() * lista_parole.length)]
    res.json({ parola_scelta: parola });
});

const server = http.createServer(app);
server.listen(5000, () => { console.log("- server running"); });