import back from "../images/reply.png";
import rupee from "../images/rupee.png";
import hdfc from "../images/hdfc-logo.png";
import sbi from "../images/sbi-logo.png";
import kotak from "../images/kotak-logo.png";
import bob from "../images/bob-logo.png";
import gpay from "../images/gpay-logo.png";
import paytm from "../images/paytm-logo.png";
import phonePe from "../images/phonepe-logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Wallet() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/home");
  };

  const defaultForm = {
    Amount: 0,
    Bearer_Name: "",
    Income_As: "",
    Vendor_Catagory: "",
    Vendor_Name: "",
    date: new Date(),
  };

  const [form, setForm] = useState(defaultForm);
  const [showBankOptions, setShowBankOptions] = useState(false);
  const [showUpiOptions, setShowUpiOptions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const all_catagories = ["Stipend", "Salary" , "Passive_Income" ,"Other"];

  const handleCatagoryClick = (value: string) => {
    setForm({ ...form, Income_As: value });
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "Income_As") {
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
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setForm((prev) => ({ ...prev, Vendor_Catagory: selectedCategory }));

    setShowBankOptions(selectedCategory === "Bank");
    setShowUpiOptions(selectedCategory === "UPI");
  };

  const handleVendorSelect = (vendor: string) => {
    setForm((prev) => ({ ...prev, Vendor_Name: vendor }));
  };

  const sendToWallet = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      alert("Expense added successfully!");
      setForm({ ...defaultForm, date: form.date });
      setShowBankOptions(false);
      setShowUpiOptions(false);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Server Error:", err.message);
      } else {
        console.error("Unknown Error:", err);
      }
      alert("Failed to submit expense");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-[30%] bg-[#7f3dff] border-2 border-[#f5ebe0] flex flex-col items-center justify-center rounded-[20px]">
        <div className="w-full bg-[#7f3dff] rounded-[20px]">
          <div className="w-full cursor-pointer rounded-[20px]">
            <img
              src={back}
              alt="Back"
              className="w-[10%] object-contain p-3 rounded-[20px] cursor-pointer"
              onClick={handleBackClick}
            />
          </div>

          <form method="post" onSubmit={sendToWallet}>
            <div className="w-[100%] mt-20">
              <p className="font-medium text-2xl pt-2 pb-2 pl-3 text-[#fcb7bc]">Balance</p>
            </div>

            <div className="w-full flex mb-5">
              <div className="w-[8%] mt-2 mb-2 flex justify-center">
                <img src={rupee} alt="Rupee" className="object-contain w-[60%]" />
              </div>

              <div className="w-[30%] flex items-center mt-2 mb-2">
                <input
                  type="number"
                  name="Amount"
                  value={form.Amount}
                  onChange={handleInputChange}
                  className="w-full font-medium text-[20px] p-2 text-white focus:outline-0 bg-transparent"
                  required
                />
              </div>
            </div>

            <div className="w-full border-2 border-white rounded-[17px] bg-white flex flex-col items-center justify-center">
              <div className="w-[90%] flex justify-center items-center mt-6 mb-2">
                <input
                  type="text"
                  name="Bearer_Name"
                  placeholder="Bearer Name"
                  value={form.Bearer_Name}
                  onChange={handleInputChange}
                  className="w-full border-2 border-[#f3f3fb] rounded-lg p-4 bg-white focus:outline-0"
                  required
                />
              </div>

              <div className="w-[90%] flex flex-col items-center relative mt-2 mb-2">
                <input
                  type="text"
                  name="Income_As"
                  placeholder="Income As"
                  value={form.Income_As}
                  onChange={handleInputChange}
                  className="w-full border-2 border-[#f3f3fb] rounded-lg p-4 bg-white focus:outline-0"
                  required
                />

                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-[60px] w-full border-2 border-[#f3f3fb] border-t-0 bg-white rounded-lg z-10 max-h-40 overflow-y-auto">
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
                <select
                  name="Vendor_Catagory"
                  value={form.Vendor_Catagory}
                  className="w-full border-2 border-[#f3f3fb] rounded-lg p-4 bg-white focus:outline-0"
                  onChange={handleCategoryChange}
                  required
                >
                  <option value="" disabled>Select Vendor</option>
                  <option value="Bank">Bank</option>
                  <option value="UPI">UPI</option>
                </select>
              </div>

              {/* Bank Options */}
              {showBankOptions && (
                <div className="w-[90%] flex flex-wrap justify-center">
                  {[{ src: bob, label: "Bank of Baroda" },
                    { src: sbi, label: "State Bank of India" },
                    { src: hdfc, label: "HDFC Bank" },
                    { src: kotak, label: "Kotak Mahindra Bank" }].map(bank => (
                    <div
                      key={bank.label}
                      className="w-[20%] m-1 bg-[#f1f1fa] rounded-[20px] hover:border-2 hover:border-[#7f3dff] cursor-pointer"
                      onClick={() => handleVendorSelect(bank.label)}
                    >
                      <img src={bank.src} alt={bank.label} className="w-full object-contain mx-auto" />
                    </div>
                  ))}
                </div>
              )}

              {/* UPI Options */}
              {showUpiOptions && (
                <div className="w-[90%] flex flex-wrap justify-center">
                  {[{ src: gpay, label: "Google Pay" },
                    { src: paytm, label: "Paytm" },
                    { src: phonePe, label: "PhonePe" }].map(upi => (
                    <div
                      key={upi.label}
                      className="w-[20%] m-1 bg-[#f1f1fa] rounded-[20px] hover:border-2 hover:border-[#7f3dff] cursor-pointer"
                      onClick={() => handleVendorSelect(upi.label)}
                    >
                      <img src={upi.src} alt={upi.label} className="w-[80%] object-contain mx-auto" />
                    </div>
                  ))}
                </div>
              )}

              <div className="w-[90%] flex items-center justify-center mt-8 mb-5 cursor-pointer">
                <button type="submit" className="bg-blue-600 text-white rounded-lg p-3 cursor-pointer">
                  Add Expense
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
