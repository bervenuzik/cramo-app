import { createContext , useState } from "react";
import PropTypes from 'prop-types';
import calculateNewScafold from "../functions/calculateStairs.js"
import {calculatefForExistingScafolding} from "../functions/calculateStairs.js"




export const Context = createContext({
    data:{},
    heigth:Number,
    history:[],
    addToHistory:()=>{},
    makeCalculationForNew:()=>{},
    makeCalculationForExisting:()=>{},
});



function AppContext({children}){
    const [data , setData] = useState({
        material: undefined,
        error:null,
    });
    const [history , setHystory] = useState([]);
    
    const contextValue = {
        data,
        history,
        addToHistory,
        makeCalculationForNew,
        makeCalculationForExisting,
    }

    function addToHistory(material){
        setHystory((prev)=>{
            prev.push(material)
            return prev
        })
    }

    function makeCalculationForNew(heigth, width, length ){
        const results = calculateNewScafold(heigth, width, length );
        setData((prev)=>({
            prev,
            ...results,
        }
    ))
    }
    function makeCalculationForExisting(heigth , length){
        const results = calculatefForExistingScafolding(heigth, length );
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