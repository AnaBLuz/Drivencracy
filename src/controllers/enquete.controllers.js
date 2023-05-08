 import { enqueteSchema } from "../schemas/enquete.schema.js"
 import { db } from "../database/database.config.js"
 import dayjs from "dayjs"
 import { ObjectId } from "mongodb";

 export async function criarEnquete(req,res){
    const {title, expireAt} = req.body;
    const { id } = req.params;
    const pollId = new ObjectId(id);

    const validation = enqueteSchema.validate(req.body, { abortEarly: false })

        if (validation.error) {
            const errors = validation.error.details.map(detail => detail.message)
            return res.status(422).send(errors)
        }

      let dataHora = expireAt;
      if(!expireAt){
        dataHora = dayjs().add(30 , "days").format("DD/MM/YYYY HH:mm")
      }

      try{
        const enquete = {_id: pollId, title: title, expireAt: dataHora}
        await db.collection("enquetes").insertOne(enquete)
        res.sendStatus(201)
      } catch (err){
        res.status(500).send(err.message)
      }
 }

 export async function getEnquetes(req,res){

  try{
    const enquetes = await db.collection("enquetes").find().toArray()
    res.send(enquetes)
  }
  catch(err){
    res.status(500).send(err.message)
  }

 }

 export async function getOpcoesVotos(req, res) {
  const id = req.params.id;

  try {
    const listaOpcoes = await db.collection('opcoes').find({ pollId: id }).toArray();

    if(listaOpcoes.length === 0) {
      return res.status(404).send('Enquete não encontrada');
    }

    res.send(listaOpcoes);
  } catch(error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

export async function resultado(req, res) {
  const id = req.params.id;

  try {
    const opcao = await db.collection('opcoes').find({ pollId: id }).toArray();
    const voto = await db.collection('votos').find({ }).toArray();
    const counter = [];
    let position = 0;
    let maior = 0;
    
    for(let i = 0; i < opcao.length; i++){
      counter.push(0);
    }

    for(let i = 0; i < opcao.length; i++) {
      for(let j = 0; j < voto.length; j++) {
        if(opcao[i]._id == (new ObjectId(voto[j].opcaoId).toString())) {
          counter[i]++;  
          if(counter[i] > maior){
            position = i;
            maior = counter[i];
          }
        }
      }
    }
 
    const enquete = await db.collection('enquetes').findOne({ _id: new ObjectId(id) });

    res.send({
      ...enquete,
      result: {
        title: opcao[position].title,
        votes: Math.max(...counter) 
      }
    })    
  } catch(error) {
    console.log(error);
    res.status(500).send(error.message);
    }
}