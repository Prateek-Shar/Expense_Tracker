import arrow_down from "../images/arrow-down.png";
import pie_chart from "../images/pie_chart.png";
import { useState, useEffect } from "react";
import ExpenseDonutChart from "../components/Expense_chart";
import IncomeDonutChart from "../components/Income_chart";

function Report() {
    interface Item {
        category: string;
        description: string;
        date: number;
        amount: number;
    }

    interface Wallet_desc {
        Amount: number;
        Income_As: string;
    }

    const [walletAmt, setWalletAmt] = useState<number | null>(null);
    const [indiWalletAmt, setIndiWalletAmt] = useState<Wallet_desc[]>([]);
    const [totalWalletAmt, setTotalWalletAmt] = useState<number | null>(null);
    const [totalExpense, setTotalExpense] = useState();
    const [items, setItems] = useState<Item[]>([]);
    const [showMonthDiv, setShowMonthDiv] = useState(false);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [monthName, setMonthName] = useState("January");
    const [showIncome, setShowIncome] = useState(false);
    const [showExpense, setShowExpense] = useState(true);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const handleMonthSelect = (month: string) => {
        setMonthName(month);
        setShowMonthDiv(false);
        fetchExpensesByMonth(month, selectedYear);
    };

    const fetchExpensesByMonth = (monthName: string, year: number) => {
        const monthMap: { [key: string]: number } = {
            January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
            July: 7, August: 8, September: 9, October: 10, November: 11, December: 12
        };

        const month = monthMap[monthName];

        fetch(`http://localhost:5000/api/expensesByMonth?month=${month}&year=${year}`)
            .then(res => res.json())
            .then(data => {
                setItems(data.expenses)
                console.log("Expense Data:", items)
            })
        .catch(err => console.error("Fetch error:", err));  

        fetch(`http://localhost:5000/api/IncomeByMonth?month=${month}&year=${year}`)
            .then(res => res.json())
            .then(data => {
                setIndiWalletAmt(data.wallet)
                console.log("Income Data:", indiWalletAmt );
            })
        .catch(err => console.error("Fetch error:", err));

        fetch(`http://localhost:5000/api/walletamt?month=${month}&year=${year}`)
            .then((res) => res.json())
            .then((data) => {
                setWalletAmt(data.totalWalletAmt);
                console.log("Wallet Amount:", data.totalWalletAmt);
            })
        .catch((err) => console.error("Fetch error:", err));

        fetch(`http://localhost:5000/api/totalExpense?month=${month}&year=${year}`)
            .then((res) => res.json())
            .then((data) => {
                setTotalExpense(data.totalExpense);
                console.log("Total Expense Amount:", data.totalExpense);
            })
        .catch((err) => console.error("Fetch error:", err));
    };


    const handleMonthDiv = () => {
        setShowMonthDiv((prev) => !prev);
    };

    const handleSelectToShowIncome = () => {
        setShowIncome(true);
        setShowExpense(false);
    };

    const handleSelctToShowExpense = () => {
        setShowExpense(true);
        setShowIncome(false);
    };

    const categoryColors: Record<string, string> = {
        Shopping: "#FFA500",
        Food: "#00C49F",
        Travel: "#8884d8",
        Bills: "#FF8042",
        Subscription: "#82ca9d",
        Other: "#ccc",
        Netflix: "#ff5400",
        sad: "#9a031e"
    };

    const IncomeCategoryColors: Record<string, string> = {
        Stipend: "#FFA500",
        Passive_Income: "#00C49F",
        Salary: "#8884d8",
        Other: "#ccc",
    };


    const chartData = items.map((item) => ({
        category: item.category,
        amount: item.amount,
        color: categoryColors[item.category] || "#ccc",
    }));

    const incomeChartData = indiWalletAmt.map((entry) => ({
        category: entry.Income_As,
        amount: entry.Amount,
        color: IncomeCategoryColors[entry.Income_As] || "#ccc",
    }));

    return (
        <div className="w-screen flex justify-center items-center">
            
            <div className="w-[35%] border-2 border-t-[#f5ebe0] border-l-[#f5ebe0] border-r-[#f5ebe0] border-b-0 bg-white flex justify-center items-center flex-col mt-4">
                {/* Month + Chart Icon */}
                <div className="w-[90%] flex justify-between">
                    {/* Month Selector */}
                    <div className="w-[25%] relative flex bg-[#f1f1fa] m-2 rounded-t-[25px]">
                        <div className="w-[30%] flex justify-center items-center ml-2 ">
                            <img src={arrow_down} onClick={handleMonthDiv} className="w-[90%] object-contain p-2 cursor-pointer" />
                        </div>

                        {showMonthDiv && (
                            <div className="w-full absolute top-[52px] rounded-b-[10px] flex flex-col max-h-32 overflow-y-auto z-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] border-t-0">
                                {months.map((month) => (
                                    <div
                                        key={month}
                                        className="w-full p-2 bg-[#f1f1fa] hover:cursor-pointer "
                                        onClick={() => handleMonthSelect(month)}
                                    >
                                        <p>{month}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Display Selected Month */}
                        <div className="w-[70%] p-2 flex items-center">
                            <p className="text-[18px] font-medium">{monthName}</p>
                        </div>
                    </div>

                    {/* Pie Chart Icon */}
                    <div className="w-[10%] m-2 border-2 border-[#f1f1fa] rounded-[20px]">
                        <img src={pie_chart} className="w-[90%] object-contain p-2" />
                    </div>
                </div>

                {/* Chart */}
                <div className="w-full flex justify-center p-2 mb-4">
                    {showExpense ? (
                        <ExpenseDonutChart data={chartData} />
                    ) : (
                        <IncomeDonutChart data={incomeChartData} />
                    )}
                </div>
                

                {/* Toggle Buttons */}
                <div className="bg-[#f1f1fa] w-[90%] flex justify-between items-center rounded-3xl">
                    <div className="w-[30%] bg-[#f1f1fa] flex justify-center items-center rounded-4xl m-1">
                        <button className={`w-[100%] rounded-[25px] p-3 text-black flex justify-center items-center cursor-pointer ${showExpense ? "bg-[#7f3dff] text-white" : "bg-[#f1f1fa]"}`}
                            onClick={handleSelctToShowExpense}>Expenses</button>
                    </div>
                    <div className="w-[30%] flex justify-center items-center m-1 rounded-4xl">
                        <button className="w-[100%] cursor-pointer p-3 rounded-[25px] focus:bg-[#7f3dff] focus:text-amber-50"
                            onClick={handleSelectToShowIncome}>Income</button>
                    </div>
                </div>

                {/* Expenses */}
                {items.length === 0 && showExpense ? (
                    <div className="w-[90%] bg-[#caf0f8] rounded-4xl p-8 mt-8 mb-8 flex justify-center items-center">
                        <p className="text-lg text-gray-500">No Transaction Found</p>
                    </div>
                ) : showExpense && (
                    <>
                        {items.map((item) => {
                            const colorClass = {
                                Shopping: "bg-orange-500",
                                Food: "bg-green-500",
                                Travel: "bg-blue-500",
                                Bills: "bg-red-500",
                                Other: "bg-gray-400",
                            }[item.category] || "bg-gray-400";

                            const barWidth = totalExpense ? Math.min((item.amount / totalExpense) * 100, 100) : 0;

                            return (
                                <div key={`${item.category}-${item.date}`} className="w-[90%] flex flex-col m-2 items-center">
                                    <div className="w-[90%] m-2 flex flex-col">
                                        <div className="w-full flex justify-between">
                                            <div className="w-[30%] border-2 mt-2 flex bg-[#fcfcfc] rounded-3xl border-[#f1f1fa]">
                                                <div className={`w-[10%] ${colorClass} rounded-4xl p-2 m-2 border-2`} />
                                                <div className="w-[80%] flex items-center">
                                                    <p>{item.category}</p>
                                                </div>
                                            </div>
                                            <div className="w-[15%] mr-2 flex justify-center items-center mt-2">
                                                <p className="text-red-500 font-medium">-{item.amount}</p>
                                            </div>
                                        </div>
                                        <div className="w-[98%] border-2 border-[#f1f1fa] bg-[#f1f1fa] rounded-3xl mb-2 mt-1 ml-1">
                                            <div className={`h-2 rounded-2xl ${colorClass}`} style={{ width: `${barWidth}%` }} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}

                {/* Incomes */}
               {showIncome && (
                <>
                {indiWalletAmt.length === 0 ? (
                    <div className="w-[90%] bg-[#caf0f8] rounded-4xl p-8 mt-8 mb-8 flex justify-center items-center">
                        <p className="text-lg text-gray-500">No Transaction Found</p>
                    </div>
                ) : (
                    indiWalletAmt.map((entry) => {

                        if (!entry.Income_As || entry.Amount === undefined || entry.Amount === null) {
                        console.warn("Skipping entry due to missing key fields", entry);
                        return null;
                        }   

                        const colorClass = {
                            Passive_Income: "bg-orange-500",
                            Salary: "bg-green-500",
                            Stipend: "bg-blue-500",
                            Other: "bg-gray-400",
                        }[entry.Income_As] || "bg-gray-400";

                        const barWidth = walletAmt ? Math.min((entry.Amount / walletAmt) * 100, 100) : 0;

                        return (
                            <div key={`${entry.Income_As}-${entry.Amount}`} className="w-[90%] flex flex-col m-2 items-center">
                                <div className="w-[90%] m-2 flex flex-col">
                                    <div className="w-full flex justify-between">
                                        <div className="w-[30%] border-2 mt-2 flex bg-[#fcfcfc] rounded-3xl border-[#f1f1fa]">
                                            <div className={`w-[10%] ${colorClass} rounded-4xl p-2 m-2 border-2`} />
                                            <div className="w-[80%] flex items-center">
                                                <p>{entry.Income_As}</p>
                                            </div>
                                        </div>
                                        <div className="w-[15%] mr-2 flex justify-center items-center mt-2">
                                            <p className="text-green-600 font-medium">+{entry.Amount}</p>
                                        </div>
                                    </div>
                                    <div className="w-[98%] border-2 border-[#f1f1fa] bg-[#f1f1fa] rounded-3xl mb-2 mt-1 ml-1">
                                        <div className={`h-2 rounded-2xl ${colorClass}`} style={{ width: `${barWidth}%` }} />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
                </>
                )}

            </div>
        </div>
    );
}

export default Report;
