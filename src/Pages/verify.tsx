import blocks from "../images/blocks.png";
import { useState, useEffect } from "react";

// generate random 4-digit code
let item_set = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let random_set = [];

for (let i = 0; i < 4; i++) {
  let random_index = Math.floor(Math.random() * item_set.length);
  random_set.push(item_set[random_index]);
  item_set.splice(random_index, 1);
}

let code = random_set.join("");
console.log(code);

// ⏱ CountdownTimer Component
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds : number) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="w-[90%] rounded-lg flex border-2">
      <p className="p-2 text-[#7f3dff]">{formatTime(timeLeft)}</p>
    </div>
  );
}

// 🔒 Main Verify Component
function Verify() {
  const [codeBoxes, setCodeBoxes] = useState([false, false, false, false]);

  const handleClick = (index : number) => {
    const newBoxes = [...codeBoxes];
    newBoxes[index] = true;
    setCodeBoxes(newBoxes);
  };

  return (
    <div className="bg-grey-500 flex items-center justify-center h-screen w-screen">
      <div className="border-[#2b7fff] w-[30%] border-2 rounded-lg mt-5 flex flex-col justify-center items-center">
        <div className="w-[90%] rounded-lg mt-5 mb-5 border-2 border-amber-400 p-2">
          <h1 className="text-center text-3xl font-bold">Verify Your Account</h1>
        </div>

        <div className="w-[90%] rounded-lg border-2 border-amber-400 p-2 mb-5">
          <h2 className="text-2xl">Enter your</h2>
          <h2 className="text-2xl">verification code</h2>
        </div>

        {/* OTP Area */}
        <div className="w-[90%] rounded-lg border-amber-500 flex border-2 items-center mb-3">
          <div className="w-[40%] p-2 border-2 border-emerald-800 rounded-lg m-2 flex justify-between">
            {codeBoxes.map((isInput, idx) =>
              isInput ? (
                <input
                  key={idx}
                  type="number"
                  onInput={(e) => {
                    const input = e.target as HTMLInputElement;
                    input.value = input.value.replace(/[^0-9]/g, '').slice(0, 1);
                  }}
                  className="w-[25%] text-center input-no-spinner p-2 m-1 border-b-2 border-b-amber-950"
                  autoFocus
                />
              ) : (
                <img
                  key={idx}
                  src={blocks}
                  alt="block"
                  onClick={() => handleClick(idx)}
                  className="object-contain w-[25%] h-[90%] cursor-pointer border-b-gray-400 rounded no-spinner"
                />
              )
            )}
          </div>
        </div>

        {/* ⏱ Countdown Timer */}
        <CountdownTimer />

        <div className="w-[90%] border-2 border-fuchsia-700 rounded-lg m-2">
          <p className="p-2 text-[18px]">
            We have sent a verification code to{" "}
            <span className="text-[#7f3dff]">abc@gmail.com</span>. Check Inbox
          </p>
        </div>

        <div className="border-2 border-cyan-700 w-[90%] p-2">
          <a href="#" className="text-[#7f3dff]">
            I didn't receive the code? Send Again
          </a>
        </div>

        <div className="border-[#2b7fff] bg-[#2b7fff] w-[90%] border-2 rounded-[10px] mt-10 flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 w-[100%] text-white rounded-[10px] p-3 cursor-pointer"
          >
            Verify
          </button>
        </div>

        <div className="border-[#eee5ff] w-[90%] flex border-2 mt-3 mb-4">
          <div className="w-[60%] h-[100%] p-2 flex items-center flex-row-reverse">
            <p>Didn't receive the code? </p>
          </div>

          <div className="w-[30%] h-[100%]">
            <button
              type="submit"
              className="p-2 w-[100%] text-[#7f3dff] rounded-md cursor-pointer flex"
            >
              Resend Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verify;
