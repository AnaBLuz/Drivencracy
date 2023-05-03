import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import joi from "joi";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

// Conexão com o banco de dados 

const mongoClient = new MongoClient(process.env.MONGO_URI)
try {
    await mongoClient.connect()
    console.log('MongoDB conectado!')
} catch (err) {
    console.log(err.message)
}

const db = mongoClient.db()



const port = process.env.PORT || 5000

app.listen(port, () => console.log("Servidor rodando"))