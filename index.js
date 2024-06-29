import  express from "express";
import dotenv from "dotenv"

dotenv.config()

const app = express()
 app.use(express.json())
//temporary db
 const plants =[
   {
      "id": 2,
      "name": "bamboo tree",
      "category": "indoor",
      "price": "340",
      "decription": "Bamboo is a woody plant with a hollow stem that's in the grass family. When bamboo is harvested and processed, it can be used to make things like flooring, paper, and chopsticks"
  },
  {
   "id": 5,
   "name": "rose",
   "category": "outdoor",
   "price": "240",
   "decription": "Their stems are usually prickly and their glossy, green leaves have toothed edges"
},
{
   "id": 8,
   "name": "mango",
   "category": "indoor",
   "price": "300",
   "decription": "A mango is a sweet tropical fruit, and it's also the name of the trees on which the fruit grows"
}
 ]

 app.post("/plant",(req,res)=>{
    const{ 
        name,
         category,
        price,
     decription
    } =req.body

    if(!name){
   return   res.json(({
         succes:false,
         data:null,
         meassage:"name cannot be empty"
      }))
    }
    if(!category){
     return res.json(({
         succes:false,
         data:null,
         meassage:"category is requried"
      }))
    }

    if(! price){
      return res.json(({
          succes:false,
          data:null,
          meassage:"price is requried"
       }))
     }

     if(!decription){
      return res.json(({
          succes:false,
          data:null,
          meassage:"decription is requried"
       }))
     }

     
 
 const randomId = Math.round(Math.random()*10000)
 const newPlant = {
    id:randomId ,
    name: name,
    category: category,
    price: price,
    decription: decription
 }

 plants.push(newPlant)
 res.json({
    success:true,
    data:newPlant,
    message:"new Plant added successfully" 
 })
})
app.get("/plants",(req,res)=>{


   res.json({
      success:true,
      data:plants,
      meassgae:"all plants fetched successfully"
   })
})

app.get("/plant/:id",(req,res)=>{
   const {id} =req.params
   const plant = plants.find((p)=>p.id==id)
     res.json({
      succes:plant?true: false,
      date:plant || null,
      meassge:plant? "plant feteched succefully":"plant not found"
   })
})

app.put("/plant/:id",(req,res)=>{
   const {id} = req.params
   let { 
      name,
       category,
      price,
   decription
  } =req.body

   
   let index =-1

   plants.forEach((plant,i)=>{
      if(plant.id==id){
         index = i
      }
   })
   const newObj = {
      name,
      category,
     price,
   decription
   }= req.body

   if(index==-1){
      return res.json({
         success:false,
         meassage:`plant not found for id ${id}`,
         data:null
         })
        
   }
   else{
      plants[index]= newObj
      return res.json({
         success:true,
         meassage:`plant updated successfully`,
         data:newObj
         })
   }
   
})

app.delete("/plant/:id",(req,res)=>{
   const {id}=req.params
   let index=-1
   plants.forEach((plant,i)=>{
      if(plant.id==id){
         index=i
      }
   })
   if(index==-1){
      return res.json({
         success:false,
         meassage:`plant not found with id ${id}`
      })
   }

   plants.splice(index,1)
   res.json({
        success:true,
        meassage:"plant deleted successfully",
        data:null
   })
})

 
const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})