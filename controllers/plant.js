import Plant from "./../models/plant.js";

const postPlant = async (req, res) => {
  const { name, category, price, description } = req.body;

  try {
    const newPlant = new Plant({
      name,
      category,
      price,
      description
    });

    const savedPlant = await newPlant.save();
    console.log(savedPlant.description)
    res.json({
      success: true,
      data: savedPlant,
      message: "New plant added successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding plant",
      error: error.message
    });
  }
};

const getPlants = async (req, res) => {
  try {
    const allPlants = await Plant.find().sort({ updatedAt: -1 });

    res.json({
      success: true,
      data: allPlants,
      message: "All plants fetched successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching plants",
      error: error.message
    });
  }
};

const getPlantId = async (req, res) => {
  const { id } = req.params;

  try {
    const plant = await Plant.findById(id);

    res.json({
      success: plant ? true : false,
      data: plant || null,
      message: plant ? "Plant fetched successfully" : "Plant not found"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching plant",
      error: error.message
    });
  }
};

const putPlantId = async (req, res) => {
  const { name, category, price, description } = req.body;
  const { id } = req.params;

  try {
    await Plant.updateOne({ _id: id }, {
      $set: {
        name,
        category,
        price,
        description
      }
    });

    const updatedPlant = await Plant.findById(id);

    res.json({
      success: true,
      message: "Plant updated successfully",
      data: updatedPlant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating plant",
      error: error.message
    });
  }
};

const deletePlantId = async (req, res) => {
  const { id } = req.params;

  try {
    await Plant.deleteOne({ _id: id });

    res.json({
      success: true,
      message: "Plant deleted successfully",
      data: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting plant",
      error: error.message
    });
  }
};

export {
  postPlant,
  getPlants,
  getPlantId,
  putPlantId,
  deletePlantId
};