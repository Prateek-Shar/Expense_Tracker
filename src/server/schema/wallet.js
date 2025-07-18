import mongoose from "mongoose";


const WalletSchema = new mongoose.Schema({
    Amount: { type: Number, required: true },
    Bearer_Name: { type: String, required: true }, 
    Income_As: {type:String , required:true},       
    Vendor_Catagory: { type: String, required: true }, 
    Vendor_Name: { type: String, required: true }, 
    date: { type: Date, default: Date.now },
});
  
const Wallet = mongoose.model("Wallet", WalletSchema);


export default Wallet;