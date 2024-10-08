
import { useState } from "react"
import cramoLogo from "../../public/cramo-logo.svg"
import InputForNew from "./InputForNew"
import InputForExisting from "./InputForExisting";
import Switch from '@mui/material/Switch';
import { FormControlLabel } from "@mui/material";


function InputBar(){

    const [calculationMode , setCalculationMode] = useState(false);
   
    const handleChange = (event) => {
        setCalculationMode(event.target.checked);
      };
    const inputFields=  calculationMode ? <InputForExisting/> : <InputForNew/>

    return(
        <aside className="flex flex-col gap-3 w-1/5 py-5 px-8 max-w-[450px] bg-stone-50  items-center scroll-smooth rounded-r-md shadow-asside ">
            <img className="p-2 min-w-[100px] max-w-[75%]" src={cramoLogo} alt="cramo_logo"></img>
            
            <FormControlLabel control={<Switch className="self-start" onChange={handleChange} checked={calculationMode} />} label="For Existing Scafold" />
            {inputFields}
        </aside>
        )
}

export default InputBar