import mongoose from "mongoose";

const lendSchema = new mongoose.Schema({
    From: { type: String, required: true },
    To: { type: String, required: true },        
    description: { type: String, required: true },
    amount: { type: Number, required: true },     
    date: { type: Date, default: Date.now },
  });
  
const Lend = mongoose.model("Lend", lendSchema);


export default Lend;