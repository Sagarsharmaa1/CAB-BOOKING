import Car from "../models/CarSchema.js";

// CREATE CAR
export const createCar = async (req, res) => {
  try {

    const { drivername, carname, cartype, price, carno } = req.body;

    const carImage = req.file ? `/uploads/${req.file.filename}` : "";

    const car = new Car({
      drivername,
      carname,
      cartype,
      price,
      carno,
      carImage
    });

    await car.save();

    res.status(201).json(car);

  } catch (error) {

    res.status(500).json({ error: "Failed to create car" });

  }
};


// GET ALL CARS
export const getAllCars = async (req, res) => {

  try {

    const cars = await Car.find();

    res.json(cars);

  } catch (error) {

    res.status(500).json({ error: "Failed to fetch cars" });

  }
};


// GET CAR BY FIND
export const getCarByFind = async (req, res) => {

  try {

    const car = await Car.findById(req.params.id);

    res.json(car);

  } catch (error) {

    res.status(500).json({ error: "Car not found" });

  }
};


// GET CAR BY ID
export const getCarById = async (req, res) => {

  try {

    const car = await Car.findById(req.params.id);

    res.json(car);

  } catch (error) {

    res.status(500).json({ error: "Car not found" });

  }
};


// UPDATE CAR
export const updateCar = async (req, res) => {

  try {

    const updateData = {
      drivername: req.body.drivername,
      carname: req.body.carname,
      cartype: req.body.cartype,
      price: req.body.price,
      carno: req.body.carno
    };

    if (req.file) {
      updateData.carImage = `/uploads/${req.file.filename}`;
    }

    const updated = await Car.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);

  } catch (error) {

    res.status(500).json({ error: "Failed to update car" });

  }
};


// DELETE CAR
export const deleteCar = async (req, res) => {

  try {

    await Car.findByIdAndDelete(req.params.id);

    res.json({ message: "Car deleted successfully" });

  } catch (error) {

    res.status(500).json({ error: "Failed to delete car" });

  }
};