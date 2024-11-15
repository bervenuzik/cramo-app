import cramoLogo from "../../public/Images/cramo-logo.svg"
import InputForDimensions from "./InputForDimensions"



function InputBar(){
    return(
        <aside className="flex flex-col gap-3 w-1/5 py-5 px-3 w-[350px] bg-stone-50  items-center scroll-smooth rounded-r-md shadow-asside ">
            <img className="p-2 min-w-[100px] max-w-[75%]" src={cramoLogo} alt="cramo_logo"></img>
            <InputForDimensions/>
        </aside>
        )
}

export default InputBar