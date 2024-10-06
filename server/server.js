import express from "express";
import cors from "cors";
import records from "./routes/record.js";

const PORT = process.env.PORT ||5050;
const HOST = 'localhost'
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);

app.listen(PORT, HOST, (err) => {
    if(err){
        console.error('Erreur lors du démarrage du serveur : ', err);
        return;
    }
    console.log(`Server listening on http://${HOST} :  ${PORT}`)
});
/*
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});*/