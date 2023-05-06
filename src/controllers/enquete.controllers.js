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

 export async function mostrarEnquetes(req,res){

  try{
    const enquetes = await db.collection("enquetes").find().toArray()
    res.send(enquetes)
  }
  catch(err){
    res.status(500).send(err.message)
  }

 }