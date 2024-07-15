 import Plant from "./../models/plant.js"
const plants =[]

  const postPlant = async (req,res)=>{
    const{ 
        name,
         category,
        price,
     description
    } =req.body

    const newPlant = new Plant({
      name:name,
      category:category,
      price:price,
      description:description
    })
const savedPlant =  await newPlant.save();


 res.json({
    success:true,
    data:savedPlant,
    message:"new Plant added successfully" 
 })
}
const getPlants = async(req,res)=>{

  const  allplants=  await Plant.find().sort({createdAT:-1})

    res.json({
       success:true,
       data:allplants,
       meassgae:"all plants fetched successfully"
    })
 }
 const getPlantId = async(req,res)=>{

    const {id} = req.params

    const  plant = await plant.findById(id)

   res.json({
          success: plant ? true: false,
          data: plant ||null,
          meassage:plant? "plant fetched successfully":"plant not found"
         
          })
         
    }
   
   

 const putPlantId = async(req,res)=>{
 
    let { 
       name,
        category,
       price,
    description
   } =req.body
   const {id} = req.params
   const updateResult = await plant.updateOne({_id:id},{
     $set: {
        name: name,
        category:category,
        price:price,
        description:description
      }
 })
 const updatedPlant = await Plant.findById(id)
 res.json({
   success:true,
   meassage:"plant updated successfully",
   data:updatedPlant

 })
   
    
 }
 const deletePlantId  = async (req,res)=>{
    const {id}=req.params
       await plant.updateOne({
         _id:id 
       })
    res.json({
         success:true,
         meassage:"plant deleted successfully",
         data:null
    })
 }
 
 
 export{
    postPlant,
    getPlants,
    getPlantId,
    putPlantId,
    deletePlantId 
}
    
   