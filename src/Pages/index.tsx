import logo1 from "../images/logo1.png";
// import { useState } from "react";
import bg_image from "../images/bg_image.png"
import { useNavigate } from "react-router-dom";

function Index() {
    // const [newProduct , setNewProduct] = useState({
    //     Username: "",
    //     password: "",
    // });

    const navigate = useNavigate()

    const handleClicktoSignup = () => {
        navigate("/signup")
    }

    const handleClicktoSignin = () => {
        navigate("/signin")
    }


    return (

        <div className="flex flex-col items-center justify-center h-screen w-screen bg-white overflow-hidden bg-opacity-80" style={{backgroundImage : `url(${bg_image})`}}>

            <div className="border-[#2b7fff] w-[30%] border-2 rounded-lg mt-5 flex items-center justify-center flex-col">

                <div className="flex flex-col items-center justify-center w-[100%] h-[100%]">
                    <div className="w-[100%] rounded-lg">
                        <img src={logo1} alt="Expense Tracker Logo" className="rounded-t-[7px]"></img>
                    </div>

                    <div className="border-[#f1f1fa] w-[80%] border-2 rounded-lg mt-5 p-2 flex items-center justify-center">
                        <h3>Know Where Your Money Goes</h3>
                    </div>

                    <div className="border-[#f1f1fa] w-[80%] border-2 rounded-lg mt-5 p-2 flex items-center justify-center text-center">
                        <h3>Become Your Own Money Manager and Make Every Rupee Count</h3>
                    </div>

                    <div className="border-[#2b7fff] bg-[#2b7fff] w-[90%] border-2 rounded-[10px] mt-8 flex items-center justify-center">
                        <button className="bg-blue-500 w-[100%] text-white rounded-[10px] p-3 cursor-pointer" onClick={handleClicktoSignin}>Sign In</button>
                    </div>

                    <div className="border-[#eee5ff] bg-[#eee5ff] w-[90%] mb-2 border-4 rounded-lg mt-4 flex items-center justify-center">
                        <button className="p-2 w-[100%] bg-[#eee5ff] text-[#7f3dff] rounded-md cursor-pointer" onClick={handleClicktoSignup}>Sign Up</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Index;