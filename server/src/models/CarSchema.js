import mongoose from "mongoose";

const carSchema = new mongoose.Schema({

  drivername: String,

  carImage: String,

  carname: String,

  cartype: String,

  price: String,

  carno: {
    type: String
  }

  // carImage:{
  //     data: Buffer,   // Store image data as a Buffer
  //     Type: String    // Store the content type (e.g., image/jpeg, image/png)
  // }

});

const Car = mongoose.model("Car", carSchema);

export default Car;