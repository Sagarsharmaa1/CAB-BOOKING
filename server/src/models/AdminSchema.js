import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;