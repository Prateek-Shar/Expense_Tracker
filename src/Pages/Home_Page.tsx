import man from "../images/man.png";
import expenses from "../images/expenses.png";
import travel_icon from "../images/travel_icon.png";
import grocery_icon from "../images/grocery_icon.png"
import drop_down from "../images/drop-down.png";
import default_expense from "../images/default_expense.png";
import subscribe from "../images/benefits_icon.png";
import lend from "../images/lend.png";
import { useState, useEffect } from "react";

const categoryImages: { [key: string]: string } = {
    Travel: travel_icon,
    Expenses: expenses,
    Lend: lend,
    Grocery: grocery_icon,
    Subscription: subscribe,
    Default: default_expense
};

function Home() {
    interface Item {
        category: string;
        description: string;
        date: number,
        amount: number;
    }


    const [items, setItems] = useState<Item[]>([]);
    const [totalExpense, setTotalExpense] = useState<number | null>(null);
    const [totalLend, setTotalLend] = useState<number | null>(null);
    const [totalWalletAmt, setTotalWalletAmt] = useState<number | null>(null);
    const [walletAmt, setWalletAmt] = useState<number | null>(null);
    const [showMonthDiv, setShowMonthDiv] = useState(false);
    const [monthText, setMonthText] = useState<string>("January");
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());


    

    useEffect(() => {
        fetch("http://localhost:5000/api/test")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data.definition)) {
                    setItems(data.definition);
                } else {
                    console.error("Expected an array but got:", typeof data);
                }
            })
            .catch((err) => console.error("Fetch error:", err));
    }, []);

    // useEffect(() => {
    //     fetch("http://localhost:5000/api/totalExpense")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setTotalExpense(data.totalExpense);
    //         })
    //         .catch((err) => console.error("Fetch error:", err));
    // }, []);

    // useEffect(() => {
    //     fetch("http://localhost:5000/api/totalLend")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setTotalLend(data.totalLent);
    //         })
    //         .catch((err) => console.error("Fetch error:", err));
    // }, []);

    useEffect(() => {
        fetch("http://localhost:5000/api/walletamt")
            .then((res) => res.json())
            .then((data) => {
                setTotalWalletAmt(data.totalWalletAmt);
                console.log("Wallet Amount:", data.totalWalletAmt);
            })
            .catch((err) => console.error("Fetch error:", err));
    }, []);

    const handleDropdownClick = () => {
        setShowMonthDiv((prev) => !prev);
    };

    useEffect(() => {
        fetchExpensesByMonth(monthText, selectedYear);
        fetchTotalsByMonth(monthText, selectedYear);
    }, []);
    

    const handleMonthSelect = (month: string) => {
        setShowMonthDiv(false);
        setMonthText(month)
        fetchExpensesByMonth(month, selectedYear);
        fetchTotalsByMonth(month, selectedYear);
    };

    const fetchExpensesByMonth = (monthName: string, year: number) => {
        const monthMap: { [key: string]: number } = {
            January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
            July: 7, August: 8, September: 9, October: 10, November: 11, December: 12
        };
        const month = monthMap[monthName];

        fetch(`http://localhost:5000/api/expensesByMonth?month=${month}&year=${year}`)
            .then(res => res.json())
            .then(data => setItems(data.expenses || []))
            .catch(err => console.error("Fetch error:", err));
    };
    

    const fetchTotalsByMonth = (monthName: string, year: number) => {
        const monthMap: { [key: string]: number } = {
            January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
            July: 7, August: 8, September: 9, October: 10, November: 11, December: 12
        };
        const month = monthMap[monthName];

      
        fetch(`http://localhost:5000/api/totalExpense?month=${month}&year=${year}`)
            .then(res => res.json())
            .then(data => setTotalExpense(data.totalExpense))
            .catch(err => console.error("Fetch error:", err));


        fetch(`http://localhost:5000/api/totalLend?month=${month}&year=${year}`)
            .then(res => res.json())
            .then(data => setTotalLend(data.totalLent))
            .catch(err => console.error("Fetch error:", err));
        
   
        fetch(`http://localhost:5000/api/walletamt?month=${month}&year=${year}`)
            .then((res) => res.json())
            .then((data) => {
                setWalletAmt(data.totalWalletAmt);
            })
        .catch((err) => console.error("Fetch error:", err));
    };

    return (
        <div className="flex justify-center w-screen pt-10">
            <div className="bg-white border-[#f5ebe0] w-[35%] border-t-2 border-l-2 border-r-2 rounded-t-lg flex flex-col items-center p-2" >
                <div className="w-[90%] flex justify-between items-center">

                    {/* Avatar */}
                    <div className="w-[10%] rounded-[50%] border-2 border-amber-800 m-2">
                        <img src={man} className="object-cover p-[2px]" />
                    </div>

                    {/* Current Text + Dropdown */}
                    <div className="w-[30%] m-2 flex justify-center items-center relative rounded-t-[10px] bg-[#fcfcfc] border-2 border-[#fcfcfc] ">
                        {showMonthDiv ? (
                            <div className="w-full absolute top-full border-2 border-[#fcfcfc] rounded-b-[10px] flex flex-col max-h-32 overflow-y-auto z-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] ">
                                <div className="w-full p-1 bg-[#fcfcfc] hover:cursor-pointer"><p onClick={() => handleMonthSelect("January")}>January</p></div>
                                <div className="w-full p-1 bg-[#fcfcfc] hover:cursor-pointer"><p onClick={() => handleMonthSelect("February")}>February</p></div>
                                <div className="w-full p-1 bg-[#fcfcfc] hover:cursor-pointer"><p onClick={() => handleMonthSelect("March")}>March</p></div>
                                <div className="w-full p-1 bg-[#fcfcfc] hover:cursor-pointer"><p onClick={() => handleMonthSelect("April")}>April</p></div>
                                <div className="w-full p-1 bg-[#fcfcfc] hover:cursor-pointer"><p onClick={() => handleMonthSelect("May")}>May</p></div>
                                <div className="w-full p-1 bg-[#fcfcfc] hover:cursor-pointer"><p onClick={() => handleMonthSelect("June")}>June</p></div>
                                <div className="w-full p-1 bg-[#fcfcfc] hover:cursor-pointer"><p onClick={() => handleMonthSelect("July")}>July</p></div>
                                <div className="w-full p-1 bg-[#fcfcfc] hover:cursor-pointer"><p onClick={() => handleMonthSelect("August")}>August</p></div>
                                <div className="w-full p-1 bg-[#fcfcfc] hover:cursor-pointer"><p onClick={() => handleMonthSelect("September")}>September</p></div>
                                <div className="w-full p-1 bg-[#fcfcfc] hover:cursor-pointer"><p onClick={() => handleMonthSelect("October")}>October</p></div>
                                <div className="w-full p-1 bg-[#fcfcfc] hover:cursor-pointer"><p onClick={() => handleMonthSelect("November")}>November</p></div>
                                <div className="w-full p-1 bg-[#fcfcfc] hover:cursor-pointer"><p onClick={() => handleMonthSelect("December")}>December</p></div>
                            </div>
                        ) : null}
                        <div className="w-[70%] flex justify-center items-center p-[10px]">
                            <p className="text-[18px] font-medium">{monthText}</p>
                        </div>

                        <div className="w-[30%] flex justify-center items-cente r">
                            <img 
                                src={drop_down} 
                                alt="dropdown" 
                                className="w-full p-2 object-contain hover:cursor-pointer active:cursor-pointer" 
                                onClick={handleDropdownClick}
                            />
                        </div>
                    </div>
                </div>

                {/* Balance */}
                <div className="w-[90%] p-6 m-2 ">
                    <p className="text-2xl font-bold p-2 flex justify-center items-center">Balance</p>
                    <p className="text-2xl font-medium flex items-center justify-center m-1">{walletAmt}</p>
                </div>

                {/* Expense + Lend */}
                <div className="w-[90%] flex justify-evenly">
                    {/* Expense */}
                    <div className="w-[35%] border-2 border-red-500 flex m-2 rounded-2xl">
                        <div className="w-[30%] bg-red-500 flex justify-center items-center rounded-tl-[14px] rounded-bl-[14px]">
                            <div className="w-[80%] bg-amber-100 flex justify-center items-center rounded-lg p-1"> 
                                <img src={expenses} className="object-contain w-[100%]" />
                            </div>
                        </div>
                        <div className="w-[71%] bg-blue-600 rounded-tr-[14px] rounded-br-[14px]">
                            <div className="w-[100%] bg-red-500 flex items-center justify-center rounded-tr-[14px]">
                                <p className="text-[16px] p-2 font-medium">Expense</p>
                            </div>
                            <div className="w-[100%] flex justify-center bg-red-500 items-center rounded-br-[14px]">
                                <p className="w-[100%] text-[16px] p-1 font-medium flex justify-center">{totalExpense}</p>
                            </div>
                        </div>
                    </div>

                    {/* Lend */}
                    <div className="w-[35%] border-2 border-[#00a86b] rounded-2xl flex m-2">
                        <div className="w-[35%] bg-[#00a86b] flex justify-center items-center rounded-tl-[10px] rounded-bl-[10px]">
                            <img src={lend} className="object-contain w-[75%] bg-[#fef3c6] p-1 rounded-lg" />
                        </div>
                        <div className="w-[75%] bg-emerald-800 flex flex-col items-center rounded-tr-[10px] rounded-br-[10px]">
                            <div className="w-[100%] bg-[#00a86b] p-2 flex justify-center items-center rounded-tr-[10px] ">
                                <p className="text-[16px] font-medium">Lend</p>
                            </div>
                            <div className="w-[100%] bg-[#00a86b] p-1 rounded-br-[10px]">
                                <p className="text-[16px] font-medium flex justify-center items-center">{totalLend}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="w-[90%] bg[#ffffff] mt-10">
                    <p className="text-[24px] font-medium text-amber-500 p-2">Recent Transactions -</p>

                    {items.length === 0 ? (
                        <div className="w-full flex justify-center rounded-4xl items-center p-8 mt-2 bg-[#caf0f8]">
                            <p className="text-lg text-gray-500">No transactions found for this month.</p>
                        </div>
                    ) : (
                        items.map((item, index) => {
                            const dateObj = new Date(item.date);
                            const hours = dateObj.getHours();
                            const minutes = dateObj.getMinutes();
                            const formattedtime = `${hours}:${minutes}`;

                            return (
                                <div key={index} className="w-[95%] flex justify-between items-center p-2 m-1 ">
                                    <div className="w-[100%] bg-[#fcfcfc] rounded-[20px] items-center flex">
                                        <div className="w-[17%] mr-2 ml-3 rounded-[20px]">
                                            <img
                                                src={categoryImages[item.category] || categoryImages.Default}
                                                className="w-[80%] object-contain p-4 bg-[#fdd5d7] rounded-[20px]"
                                                alt={item.category}
                                            />
                                        </div>
                                        <div className="w-[75%] flex">
                                            <div className="w-[50%] flex items-center flex-col">
                                                <div className="w-[100%] flex justify-center items-center p-2 ml-2 mr-2">
                                                    <p className="text-[16px] font-medium">{item.category}</p>
                                                </div>
                                                <div className="w-[100%] flex justify-center items-center p-3 ml-2 mr-2">
                                                    <p className="text-[12px] font-medium">{item.description}</p>
                                                </div>
                                            </div>
                                            <div className="w-[50%] flex justify-center items-center flex-col">
                                                <div className="w-[100%] flex justify-center items-center p-2 ml-2 mr-2">
                                                    <p className="text-[16px] font-medium">₹{item.amount}</p>
                                                </div>
                                                <div className="w-[100%] flex justify-center items-center p-2 ml-2 mr-2">
                                                    <p className="text-[16px] font-medium">{formattedtime}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

            </div>
        </div>
    );
}

export default Home;
