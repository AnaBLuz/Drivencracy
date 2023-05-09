import { opcaoVotoSchema } from "../schemas/voto.schema.js"
import { db } from "../database/database.config.js"
import { ObjectId } from "mongodb";
import dayjs from "dayjs";


export async function criarVoto(req,res){
    const {title, pollId} = req.body;
    
    const validation = opcaoVotoSchema.validate(req.body, { abortEarly: false })
    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message)
        return res.status(422).send(errors)
    }

   try{
    const enqueteExistente = await db.collection("enquetes").findOne({ _id: new ObjectId(pollId)})
    if(!enqueteExistente) return res.sendStatus(404)
    const opcaoExistente = await db.collection("opcoes").findOne({
        title: title, pollId: new ObjectId(pollId)
    })
    if (opcaoExistente) return res.sendStatus(409)

    //const expirou = dayjs().isAfter(dayjs(enqueteExistente.expireAt))
    //if (expirou) return res.sendStatus(403)

    await db.collection('opcoes').insertOne({ title, pollId})
    res.sendStatus(201)

} catch (error) {
    console.log(error)
}
}

export async function votar(req, res) {
    const id = req.params.id;
  
    const vote = {
      createdAt: dayjs().format('YYYY-MM-DD HH:mm'), 
        choiceId: id
    }
  
    try {
      const votoExiste = await db.collection('opcoes').findOne({ _id: new ObjectId(id)} );
  
      if(!votoExiste) {
        return res.status(404).send('Opção de voto não existente')
      }
  
      const enquete = await db.collection("enquetes").findOne({ _id: new ObjectId(votoExiste.pollId) });
  
      const dataExpericao = enquete.expiredAt
  
      const expirada = dayjs().isAfter(dataExpericao, 'days');
      if(expirada) {
        return res.status(403).send('Enquete expirada')
      }
  
      await db.collection("votos").insertOne(vote);
  
      res.sendStatus(201);
    } catch(error) {
      console.log(error)
      res.status(500).send(error.message);
    }
  }




