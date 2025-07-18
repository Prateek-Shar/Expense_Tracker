import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },     
  description: { type: String, required: true },
  category: { type: String, required: true },
  TransactionType: { type: String, required: true }, // Added TransactionType field
  date: { type: Date, required: true },
});

const Expense = mongoose.model("Expense", expenseSchema);

// const expense = new Expense({
//   userId: "12345",
//   amount: 100,
//   description: "Groceries",
//   category: "Food",
//   date: new Date(),
//   createdAt: new Date()
// });

// expense.save();


// const expenses = [
//   {
//     userId: "12345",
//     amount: 100,
//     description: "Groceries",
//     category: "Food",
//     TransactionType: "Online"
//   },
//   {
//     userId: "12345",
//     amount: 50,
//     description: "Transport",
//     category: "Travel",
//     TransactionType: "Online"
//   },
//   {
//     userId: "12345",
//     amount: 200,
//     description: "Utilities",
//     category: "Bills",
//     TransactionType: 'Cash'
//   }
// ];

// // ✅ Insert inside async IIFE
// (async () => {
//   try {
//     const docs = await Expense.insertMany(expenses);
//     console.log("Expenses inserted successfully:", docs);
//     await mongoose.disconnect(); // Optional: close connection after insert
//   } catch (err) {
//     console.error("Error inserting expenses:", err);
//   }
// })();





export default Expense;


