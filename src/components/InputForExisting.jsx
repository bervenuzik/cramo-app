import { useContext } from "react";
import {Context} from "./AppContext.jsx"
import Input from "./Input";
import Radio from "./Radio"
import Button from "./Button";
function InputForNew(){

    const context = useContext(Context);

    const {onHeigthChange} = context;
    const {onLengthChange} = context;
    const {makeCalculationForExisting} = context;
    const lengthOptions = [2.57 , 3.07];
    return(
        <div className="flex flex-col items-center w-full">
            <Input onChange={onHeigthChange} label="heigth" min='2' type="number"/>
            <Radio onChange={onLengthChange} label="length" options={lengthOptions}/>
            <Button onClick={makeCalculationForExisting}>calculate</Button>
        </div>
    )

}

export default InputForNew