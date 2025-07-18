import Not_Found_Image from "../images/Not_Found_Image.png"
import { useNavigate } from "react-router-dom";



function PageNotFound() {

    const navigate = useNavigate();

    const handleClickToIndex = () => {
        navigate("/")
    }

    return (
        
        <div className="w-screen bg-[#caf0f8] h-screen flex justify-center items-center flex-col">
            
            <div className="w-[90%] bg-[#90e0ef] flex justify-center items-center rounded-t-4xl">
                <img src={Not_Found_Image} className="object-contain w-[1000px] h-[750px]" />
            </div>

            <div className="bg-[#90e0ef] w-[90%] flex justify-center items-center rounded-b-4xl">
                
                <button className="relative px-6 py-2 bg-black text-gray-400 text-xl font-bold uppercase flex items-center gap-3 border-2 border-black after:content-[''] after:absolute after:top-1.5 after:left-2 after:w-full after:h-full  after:border-2 after:border-black m-5 cursor-pointer" onClick={handleClickToIndex}> Back To Home
                <span className="text-2xl">→</span>
                </button>
            
            </div>

        </div>
        
    )
}

export default PageNotFound;