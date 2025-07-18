import rupee from "../images/rupee.png";
import clip from "../images/clip.png";
import transaction from "../images/fromTo.jpg"
import back from "../images/reply.png"
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Lend() {

    const Navigate = useNavigate();

    const defaultForm = {
            From: "",
            amount: 0,
            description: "",
            To: "",
            date: new Date(),
        };
          
        const [form, setForm] = useState(defaultForm);
          
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setForm((prev) => ({ ...prev, [name]: value }));
        };
          
        const sendBorrow = async (e: React.FormEvent) => {
            e.preventDefault();
          
            try {
              const res = await fetch("/api/lend", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
          
            if (!res.ok) throw new Error("Request failed");
          
              const data = await res.json();
              console.log("Expense added:", data);
              alert("Expense added successfully!");
              setForm({ ...defaultForm, date: form.date });
            } catch (err) {
              console.error("Error:", err);
              alert("Failed to submit expense");
            }
        };
          
        const handleClick = () => {
            Navigate("/home")
        }

    return (
        
        <div className="w-screen h-screen bg-linear-to-r from-[#90e0ef] to-[#ade8f4]] flex justify-center items-center">
            <div className="w-[30%] border-2 border-[#f5ebe0] bg-[#0077ff] flex items-center justify-center flex-col rounded-[20px]">

                <div className="w-[100%] bg-[#0077ff] mt-2 rounded-[20px]">

                    <div className="w-[100%] rounded-[20px] cursor-pointer">
                        <img src={back} className="w-[10%] object-contain p-3 cursor-pointer" onClick={handleClick} />
                    </div>

                    <form className="flex flex-col justify-center items-center" onSubmit={sendBorrow} method="post">
                        <div className=" w-[100%] bg-[#0077ff] rounded-t-[20px]">
                            <div className="w-[90%] bg-[#0077ff] mt-34">
                                <p className="font-medium text-2xl p-2 text-[#fcb7bc]">How Much ?</p>
                            </div>

                            <div className="w-[100%] flex mb-5">
                                <div className="w-[10%] mt-2 mb-2 flex items-center ">
                                    <img src={rupee} alt="Rupee" className="object-contain w-[70%] pl-2" />
                                </div>

                                <div className="w-[30%]  flex justify-center items-center mt-2 mb-2">
                                    <input type="number" name="amount" className="w-[100%] font-medium text-[20px] p-2 text-white focus:outline-0" value={form.amount} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white flex justify-center items-center flex-col rounded-[17px]">
                            <div className="w-[90%]  mt-6 mb-2 flex justify-center">
                                <div className="w-[45%] z-0 border-2 border-[#f1f1fa] bg-white rounded-[10px] ">
                                    <input type="text" placeholder="From" name="From" className="w-[100%] p-3 focus:outline-0" value={form.From} onChange={handleChange} />
                                </div>

                                <div className="w-[10%] flex justify-center items-center z-10 -translate-x-[10px]">
                                    <div className="w-[100%] border-2 border-[#f1f1fa] rounded-[20px] p-1 bg-white">
                                        <img src={transaction} className="w-[100%] object-cover"></img>
                                    </div>
                                </div>

                                <div className="w-[45%] z-0 -translate-x-[20px] rounded-[10px] border-2 border-[#f1f1fa] bg-white pl-2 focus:outline-0">
                                    <input type="text" placeholder="To" name="To" className="w-[100%] p-3 focus:outline-0" value={form.To} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="w-[88%] flex justify-center items-center mt-2 mb-2">
                                <input type="text" name="description" placeholder="Description"  className="w-[100%] border-2 border-[#f3f3fb] rounded-lg p-4 bg-white focus:outline-0" value={form.description} onChange={handleChange} required />
                            </div>

                            {/* <div className="w-[70%] flex justify-center items-center border-2 border-dashed border-[#f6f6fb] rounded-lg mt-4 mb-2 bg-white">
                                <div className="w-[10%] mt-2 mb-3">
                                    <img src={clip} alt="Clip" className="object-contain w-[70%] p-1 cursor-pointer" />
                                </div>

                                <div className="w-[40%]">
                                    <input type="button" value="Add Attachment" name="attachment" placeholder="Attachment" className="w-[100%]  text-[#9898a5] cursor-pointer p-2" />
                                </div>
                            </div> */}

                            <div className="w-[90%] flex items-center mt-10 mb-5 cursor-pointer justify-center ">
                                <button type="submit" className="bg-blue-600 text-white rounded-lg p-3 cursor-pointer">Add Expense</button>
                            </div>  
                        </div>
                    </form>

                </div>

            </div>
       </div>  

    );
}

export default Lend;