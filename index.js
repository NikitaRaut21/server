import  express from "express";
import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose";
import cors from "cors"
  
import { getHealth } from "./controllers/health.js";
import {
   postPlant,
    getPlants,
    getPlantId, 
    putPlantId, 
    deletePlantId 
    } from "./controllers/plant.js";
 import { handlepageNotFound} from "./controllers/error.js"

const app = express()
app.use(cors())
 app.use(express.json())

const dbConnection = async ()=>{
   const conn = await mongoose.connect(process.env.MONGO_URL)

   if(conn){
      console.log("mongodb connected..")
   } 
   else{
      console.log("mongodb is not  connected")
}
}
dbConnection();

app.get("/health",getHealth)

app.post("/plant",postPlant)
app.get("/plants",getPlants)
app.get("/plant/:id",getPlantId)
app.put("/plant/:id", putPlantId)
app.delete("/plant/:id", deletePlantId )
 
app.use("*",handlepageNotFound)

const PORT = process.env.PORT || 8000

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
}) 