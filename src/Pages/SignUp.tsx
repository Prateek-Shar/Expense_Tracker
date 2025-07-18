import google from "../images/google.png";
import {useState} from "react";
import { useNavigate } from "react-router-dom"; 
import checkbox_uncheck from "../images/checkbox_uncheck.png";
import checkbox_check from "../images/checkbox_checked.png";
import bg_image from "../images/bg_image.png"
import eye_open from "../images/eye_open.png";
import eye_close from "../images/eye_close.png";

function SignUp() {
    const navigate = useNavigate()
    const [isChecked, setIsChecked] = useState(false);

    const defaultForm = {
        Username: "",
        Email: "",
        Password: "",
        date: new Date(),
    };
      
    const [showDiv , setShowDiv] = useState(false)
    const [form, setForm] = useState(defaultForm);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log('Input change:', name, value);
        setForm((prev) => {
            const newForm = { ...prev, [name]: value };
            console.log('New form state:', newForm);
            return newForm;
        });
    };
    
    const handleCheckboxClick = () => {
        setIsChecked(!isChecked);
    };

    const sendExpense = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isChecked) {
            alert("You must agree to the Terms of Service and Privacy Policy to sign up.");
            return;
        }

        try {
            const res = await fetch("/api/newUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error("Request failed");

            const data = await res.json();
            console.log("Expense added:", data);
            alert("New User Added Successfully!");
            setForm({ ...defaultForm, date: form.date });
            setIsChecked(false)
        } catch (err) {
            console.error("Error:", err);
            alert("Failed to add New User");
        }
    };

    const handleClichtoSignIn = () => {
        navigate("/signin")
    } 

    return (
        <div
            className="min-h-screen min-w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${bg_image})` }}
        >
            <form
                onSubmit={sendExpense}
                method="POST"
                className="flex flex-col items-center justify-center min-h-screen min-w-full overflow-hidden"
            >
                <div className="border-[#2b7fff] w-[30%] border-2 rounded-lg mt-5 flex items-center justify-center flex-col bg-white bg-opacity-80 shadow-2xl">
                    
                    <div className="w-[90%] rounded-lg"> 
                        <input type="text" placeholder="Username" className="w-[100%] p-4 border-2 border-[#f1f1fa] rounded-lg mt-5 focus:outline-none" name="Username" onChange={handleChange}
                        value={form.Username} required />
                    </div>

                    <div className="w-[90%] rounded-lg"> 
                        <input type="email" placeholder="Email" className="w-[100%] p-4 border-2 border-[#f1f1fa] rounded-lg mt-5 focus:outline-none" name="Email" onChange={handleChange} value={form.Email} required />
                    </div>

                    <div className="w-[90%] rounded-lg border-2 border-[#f1f1fa] mt-4 flex">
                        <div className="w-[90%]"> 
                            <input
                                type={showDiv ? "text" : "password"}
                                placeholder="Password"
                                name="Password"
                                className="w-[100%] p-3 rounded-lg mb-2 focus:outline-none"
                                onChange={handleChange}
                                value={form.Password}
                                required
                            />
                        </div>
                        <div
                            className="w-[10%] flex justify-center items-center"
                            onClick={() => setShowDiv((prev) => !prev)}
                            style={{ cursor: "pointer" }}
                        >
                            <img
                                src={showDiv ? eye_open : eye_close}
                                className="object-contain w-[70%]"
                                alt={showDiv ? "Hide password" : "Show password"}
                            />
                        </div>
                    </div>  

                    <div className="w-[90%] rounded-lg flex border-2 border-[#f1f1fa] mt-3 mb-5"> 
                        <div className="w-[10%] flex justify-center items-center cursor-pointer" onClick={handleCheckboxClick}>
                            <img 
                                src={isChecked ? checkbox_check : checkbox_uncheck} 
                                className="object-contain w-[60%]" 
                                alt="Terms checkbox"
                            />
                        </div>

                        <div className=" w-[90%] flex items-center justify-center p-1">
                            <p>By Signing up , you agree to the <span className="text-[#7f3dff]">Terms of Service and Privacy Policy</span></p>
                        </div>
                    </div>

                    <div className="border-black w-[90%] mb-4">
                        <button type="submit" className="bg-blue-500 w-[100%] text-white rounded-[10px] p-3 cursor-pointer">Sign Up</button>
                    </div>

                    <div className="border-amber-950 w-[20%]">
                        <p className=" p-1 w-[100%] bg-[#eee5ff] text-[#7f3dff] rounded-md cursor-default mb-3 flex justify-center items-center">Or With</p>
                    </div>

                    <div className="w-[90%] flex items-center justify-center rounded-lg mb-3 mt-3 p-2">
                        <img src={google} className="w-[10%] object-contain p-2 mr-2"  alt="Google Sign Up" />
                        <div className="p-3 text-[20px]"><a href="#">Sign Up With Google</a></div>
                    </div>

                    <div className="w-[90%] flex mt-3 mb-4">
                        <div className="w-[65%] h-[100%] p-2 flex items-center flex-row-reverse">
                            <p>Already have an account ? </p>
                        </div>

                        <div className="w-[30%] h-[100%] flex">
                            <button type="button" className=" pt-2 pb-2 w-[100%] text-[#7f3dff] rounded-md cursor-pointer flex flex-row" onClick={handleClichtoSignIn}>Sign In</button>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    );
}

export default SignUp;