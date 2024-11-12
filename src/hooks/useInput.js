import { useState } from "react";
import DOMPurify from 'dompurify';

export default function useInput(startValue , validationFunction , errorMessage){
    const initialValue = {
        value: startValue? startValue : "",
        isTouched:false,
        isValid:false,
        showError: false,
        errorMessage:errorMessage,
    }
    const [value , setValue] = useState(initialValue);

    function onChange(value){
        setValue(()=>{
            value = DOMPurify.sanitize(value);
            value = value.trim();
            const isValid = validationFunction(value)
            const isTouched = true;
            return {
                isValid:isValid,
                value:value,
                isTouched:isTouched,
                showError: isTouched && !isValid,
                errorMessage:errorMessage,
            }
        })
    }

    function validate(){
        setValue((prev)=>{
            
            const isValid = validationFunction(value)
            const isTouched = true;
            return {
                ...prev,
                isTouched:isTouched,
                isValid:isValid,
                showError: isTouched && !isValid
            }
        })
    }
    function reset(){
        setValue(initialValue);
    }

    return [value , onChange , reset , validate]

}