import { useContext } from "react";
import {Context} from "./AppContext.jsx"
import Input from "./Input";
import Radio from "./Radio"
import Button from "./Button";
function InputForNew(){

    const context = useContext(Context);

    const {onHeigthChange} = context;
    const {onWidthChange} = context;
    const {onLengthChange} = context;
    const {makeCalculationForNew} = context;
    const lengthOptions = [2.57 , 3.07];
    return(
        <div className="flex flex-col items-center w-full">
            <Input onChange={onWidthChange} step='0.01' max="3.8" min="0.73" label="width (Max 3.8m)" type="number"/>
            <Input onChange={onHeigthChange} label="heigth" min='2' type="number"/>
            <Radio onChange={onLengthChange} label="length" options={lengthOptions}/>
            <Button onClick={makeCalculationForNew}>calculate</Button>
        </div>
    )

}

export default InputForNew