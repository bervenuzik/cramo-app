import { useContext } from "react";
import { Context } from "./AppContext";


function Radio({options, onChange , label}){
    const {length} = useContext(Context)
    return(
        <span className="uppercase text-stone-950 md:text-l w-full flex flex-col gap-3 items-start ">{label}
        <form className="w-full flex justify-around gap-5"> 
            {options.map((option, index) => (
                <span key={index} className="block w-[100px] relative border-solid border-gray-500 border-[2px] rounded-md p-3">
                    <input checked={+option == +length}  onChange={(ev)=>onChange(ev)} id={option} type="radio" value={option} name={"radioGroup" + label} /> 
                    <label className="flex items-center justify-end pr-4 inset-0 absolute cursor-pointer " htmlFor={option}>{option}</label>
                </span>
            ))}  
        </form>
        </span>
    )   
}


export default Radio;