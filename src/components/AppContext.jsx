import { createContext , useState } from "react";
import PropTypes, { func } from 'prop-types';
import calculateNewScafold from "../functions/calculateStairs.js"
import {calculatefForExistingScafolding} from "../functions/calculateStairs.js"




export const Context = createContext({
    data:{},
    resetData:()=>{},
    heigth:Number,
    history:[],
    addToHistory:()=>{},
    updateData:()=>{},
    makeCalculationForNew:()=>{},
    makeCalculationForExisting:()=>{},
});



function AppContext({children}){
    const initialData = {
            material: undefined,
            error:null,
    }
    const [data , setData] = useState(initialData);
    const [history , setHystory] = useState([]);
    
    const contextValue = {
        data,
        updateData,
        resetData,
        history,
        addToHistory,
        makeCalculationForNew,
        makeCalculationForExisting,
    }

    function updateData(data){
        setData((prev)=>{return {
                ...prev,
                material:data,
        }
    })
    }

    function resetData(){
        setData(initialData)
    }

    function addToHistory(material){
        setHystory((prev)=>{
            prev.push(material)
            return prev
        })
    }

    function makeCalculationForNew(heigth, width, length ){
        const results = calculateNewScafold(heigth, width, length );
        setData(()=>({
            ...results,
        }
    ))
    }
    function makeCalculationForExisting(heigth , length){
        const results = calculatefForExistingScafolding(heigth, length );
        setData(()=>({
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