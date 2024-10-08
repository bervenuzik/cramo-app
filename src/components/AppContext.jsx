import { createContext , useState } from "react";
import PropTypes from 'prop-types';
import materialList from "../data/material.json";
import calculateForNew from "../functions/calculateStairs.js"
import {calculateStairfForExistingScafolding} from "../functions/calculateStairs.js"
import DIMENSION_CONSTRAINTS from "../functions/dimensionsConstraint.js"



export const Context = createContext({
    data:{},
    addMaterial:()=>{},
    width:Number,
    length:Number,
    heigth:Number,
    makeCalculationForNew:()=>{},
    makeCalculationForExisting:()=>{},
});



function AppContext({children}){
    const [data , setData] = useState({
        material: undefined,
        error:null,
        
    });
    const [heigth , setHeigth] = useState(0);
    const [width , setWidth] = useState(0);
    const [length , setLength] = useState(2.57);
    
    const contextValue = {
        data,
        heigth,
        width,
        length,
        onHeigthChange,
        onWidthChange,
        onLengthChange,
        makeCalculationForNew,
        makeCalculationForExisting,
    }
    function onHeigthChange(event){
        const value = +event.target.value;
        setHeigth(()=>value);
    }

    function onWidthChange(event){
        const value = +event.target.value;
        setWidth(()=>value);
    }
    function onLengthChange(event){
        const value = +event.target.value;
        setLength(()=>value);
        console.log(length);
    }
    function makeCalculationForNew(){
        const results = calculateForNew(heigth, width, length );
        setData((prev)=>({
            prev,
            ...results,
        }
    ))
    }
    function makeCalculationForExisting(){
        const results = calculateStairfForExistingScafolding(heigth, length );
        setData((prev)=>({
            prev,
            ...results,
        }
    ))
    }


    return(
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}
AppContext.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppContext;