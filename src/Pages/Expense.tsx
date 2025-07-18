import rupee from "../images/rupee.png";
import clip from "../images/clip.png";
import back from "../images/reply.png";
import { useState } from "react";
import { useNavigate }  from "react-router-dom";


function Expense() {

    const Navigate = useNavigate()
    
    const defaultForm = {
        amount: 0,
        description: "",
        category: "",
        TransactionType: "",
        userId: "12345",
        date: new Date(),
      };
    
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [suggestiontransaction , setSuggestionTransaction] = useState<string[]>([])
    const [showTransactionSuggestion , setShowTransactionSuggestion] = useState(false) 


    const all_catagories = ["Food", "Travel", "Shopping", "Subscription", "Bills", "Other"]

    const all_transaction_types = ["Online" , "Cash"]

    // / Format date as dd/mm/yy hh:mm

    const [form, setForm] = useState(defaultForm);
      
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        
        if (name === "category") {
        
            if (value.trim().length > 0) {
            const filtered = all_catagories.filter(cat =>
                cat.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filtered);
            setShowSuggestions(true);
            } else {
                setShowSuggestions(false);
            }
        }

        if (name === "TransactionType") {

            if (value.trim().length > 0) {
                const filter = all_transaction_types.filter(att =>
                    att.toLowerCase().includes(value.toLowerCase())
                );
                setSuggestionTransaction(filter);   
                setShowTransactionSuggestion(true);
            } else {
                setShowTransactionSuggestion(false)   
            }
        }
    };


    const handleCatagoryClick = (value: string) => {
        setForm({ ...form, category: value });
        setShowSuggestions(false);
    };

    const handleTransactionTypeClick = (value: string) => {
        setForm((prev) => ({ ...prev, TransactionType: value }));
        setShowTransactionSuggestion(false);
    };
      
    const sendExpense = async (e: React.FormEvent) => {
    e.preventDefault();

    
    const formToSend = { ...form };
    
    try {
        const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formToSend),
        });
    
        if (!res.ok) throw new Error("Request failed");
    
        await res.json();
        alert("Expense added successfully!");
        setForm({ ...defaultForm, userId: form.userId, date: form.date });
        } catch (err) {
            alert("Failed to submit expense");
        }
    };
    

    const handleClick = () => {
        Navigate("/home")
    }
    

    return (
       <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-[30%] bg-[#fd3c4a] border-2 border-[#f5ebe0]  flex items-center justify-center flex-col rounded-[20px]">

                <div className="w-full bg-[#fd3c4a] rounded-[20px]">

                    <div className="w-[100%] rounded-[20px] cursor-pointer">
                        <img src={back} className="w-[10%] object-contain p-3 cursor-pointer" onClick={handleClick} />
                    </div>

                    <form onSubmit={sendExpense} method="post">
                        <div className="w-[90%] bg-[#fd3c4a] mt-34 ">
                            <p className="font-medium text-2xl p-2 text-[#fcb7bc]">How Much ?</p>
                        </div>

                        <div className="w-[100%] bg-[#fd3c4a] flex mb-5">
                            <div className="w-[10%] mt-2 mb-2">
                                <img src={rupee} alt="Rupee"  className="object-contain w-[80%] p-2" />
                            </div>

                            <div className="w-[30%] flex items-center mt-2 mb-2">
                                <input type="number" name="amount" value={form.amount} onChange={handleChange} className="w-[100%] font-medium text-[20px] p-2 text-white focus:outline-0" />
                            </div>
                        </div>

                    

                        <div className="w-[100%] border-2 border-white  rounded-[17px] bg-white flex flex-col justify-center items-center">
                            
                            <div className="w-[90%] flex justify-center items-center mt-4 mb-2 relative">
                                <input
                                type="search"
                                name="category"
                                placeholder="Category"
                                value={form.category}
                                onChange={handleChange}
                                className="w-[100%] border-2 border-[#f3f3fb] rounded-lg p-4 bg-white focus:outline-0"
                                required
                                />

                                {showSuggestions && suggestions.length > 0 && (
                                    <div className="absolute top-[50px] mt-1 w-full border-2 border-[#f3f3fb] border-t-0  bg-white rounded-lg  z-10 max-h-40 overflow-y-auto">
                                        {suggestions.map((suggestion) => (
                                            <div
                                                key={suggestion}
                                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                                onClick={() => handleCatagoryClick(suggestion)}
                                            >
                                                {suggestion}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="w-[90%] flex justify-center items-center mt-2 mb-2">
                                <input type="text" 
                                name="description" 
                                placeholder="Description" 
                                value={form.description} 
                                onChange={handleChange}  
                                className="w-[100%] border-2 border-[#f3f3fb] rounded-lg p-4 bg-white focus:outline-0" required />
                            </div>

                            <div className="w-[90%] flex justify-center items-center mt-2 mb-2 relative">
                                <input type="search"
                                name="TransactionType" 
                                placeholder="Transaction Type" 
                                value={form.TransactionType} 
                                onChange={handleChange} 
                                className="w-[100%] border-2 border-[#f3f3fb] bg-white rounded-lg p-4 focus:outline-0" required />

                                {showTransactionSuggestion && suggestiontransaction.length > 0 && (
                                    <div className="absolute top-[50px] mt-1 w-full border-2 border-[#f3f3fb] border-t-0  bg-white rounded-lg  z-10 max-h-40 overflow-y-auto">
                                        {suggestiontransaction.map((suggestiontransaction) => (
                                            <div
                                                key={suggestiontransaction}
                                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                                onClick={() => handleTransactionTypeClick(suggestiontransaction)}

                                            >
                                                {suggestiontransaction}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* <div className="w-[90%] flex justify-center items-center border-2 border-dashed border-[#f3f3fb] rounded-lg mt-2 mb-2 bg-white">
                                <div className="w-[10%] mt-2 mb-3">
                                    <img src={clip} alt="Clip" className="object-contain w-[70%] p-1 cursor-pointer" />
                                </div>

                                <div className="w-[40%]">
                                    <input type="button" value="Add Attachment" name="attachment" placeholder="Attachment" className="w-[100%]  text-[#9898a5] cursor-pointer" />
                                </div>
                            </div> */}

                            <div className="w-[90%] flex items-center mt-5 mb-3 cursor-pointer justify-center">
                                <button type="submit" className="bg-blue-600 text-white rounded-lg p-3 cursor-pointer">Add Expense</button>
                            </div>  
                            
                        </div>
                    </form>

                </div>

            </div>
       </div>
    )
}

export default Expense;