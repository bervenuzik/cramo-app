import materialData from "../data/material.json";
import heigthValidation from "./validations/heightValidationForNew.js"
import widthValidation from "./validations/widthValidationForNew.js"
import lengthValidation from "./validations/lengthValidatorForNew.js"
import cloneDeep from 'lodash/cloneDeep';
const STAIRS_DEFAULD_WIDTH = 0.73;
const MONTAGE_POINTS = 6;
let material;
let bottomLayer = false;
let fullLevels = 0;
let restHeight = 0;


export function validateDimentions(height , width , length){
    const isWidthValid = widthValidation(width);
    const isHeigthValid = heigthValidation(height)
    const isLengthValid = lengthValidation(length)
    if( isHeigthValid && isLengthValid && isWidthValid) return true;
    return false;
}

//TODO: IMPROVE VALIDATION
export default function calculateNewScafold(height , width , length){
    material = cloneDeep(materialData.material);
    // if(!validateDimentions(height ,width ,length)) return;
    calculateLevels(height);
    calculateSpira(height);
    calculateFirstSide(width , length);
    calculateSecondSide(length);
    addStairs(length);

    const results = getResultListOfMaterial(material);
    return {
        material:[...results] , 
        error:null
    };
}

export function calculatefForExistingScafolding( height , length){
    material = cloneDeep(materialData.material);
    if(!heigthValidation(height)){
        return {
            material:null , 
            error:{
                message:"Invalid Height , shoul be bigger then 2m",
            }}
    }
    calculateLevels(height);
    calculateSpira(height , 2);
    addStairs(length);
    const results = getResultListOfMaterial(material);
    return {
        material:[...results] , 
        error:null
    };

} 



export function calculateLevels(heigh){
     fullLevels = Number.parseInt(heigh/2);
     restHeight = (heigh % 2).toFixed(2);
     if(restHeight <= 0.5) bottomLayer = true;
}

export function calculateSpira(heigth , montagePoints = MONTAGE_POINTS){
    if(bottomLayer) {
        material["BSG"]["bottendetalj"].amount = montagePoints;
    }
    material["BSG"]["klossar"].amount = montagePoints;
    material["BSG"]["_0.8"].amount = montagePoints;
    const sortedSpiras = formatDataWithDcsSorting(material.spira);

    const _3m_Spira = Number.parseInt(heigth / 3);
    material["spira"]["_3"].amount = montagePoints * _3m_Spira
    //adding 1m to restOfHeigth to compensate protaction on last level
    const restOfHeigth = +(heigth%3 +1).toFixed(2);
    //calculating amount of spiras for protection and first level(if the heigth is not sharp)
    if(restOfHeigth){
        for (let spira of sortedSpiras) {
            const spiraKey = Object.keys(spira)[0];
            spira = spira[spiraKey];
            const spiraLength = +spira.length;
            if(restOfHeigth >= spiraLength){
                material["spira"][spiraKey].amount = montagePoints
                break;
            }
        }
    }
    

}


function formatDataWithDcsSorting(object){
    let sortedArray = [];
        for(let key in object){
            sortedArray.push({
                [key]:{
                    ...object[key] ,
                    amount:0,                   
                }
            })
        }
        sortedArray.sort((a, b) => {
            const lengthA = parseFloat(Object.values(a)[0].length);
            const lengthB = parseFloat(Object.values(b)[0].length);
            return lengthB - lengthA ;
        });
        return sortedArray;
}

export function calculateFirstSide(width  , length ){
    const widthWithoutStairs = width - STAIRS_DEFAULD_WIDTH;
    const sortedU_Bom = formatDataWithDcsSorting(material["U-BOM"]);
   
    // add u-Boms and steelplanks for second section
    for (let bom of sortedU_Bom ) {
        const bomKey = Object.keys(bom)[0];
        const bomData = bom[bomKey];
        const bomLength = +bomData.length;
        if(widthWithoutStairs >= bomLength){
            const plankPerU_Bom_0_32 = material["U-BOM"][bomKey]["platform_0.32"];
            const plankPerU_Bom_0_19 = material["U-BOM"][bomKey]["platform_0.19"];
                material["U-BOM"][bomKey].amount = bomData.amount + (((MONTAGE_POINTS - 2) / 2) * fullLevels) + 2
                material["platformlås"][bomKey].amount = bomData.amount + (((MONTAGE_POINTS - 2) / 2) * fullLevels) + 2
                material["HS"][bomKey].amount = bomData.amount + (((MONTAGE_POINTS - 2) / 2) * fullLevels) + 2
                material["Stålplank_0.32"][`_${length}`].amount = fullLevels * plankPerU_Bom_0_32;
                material["Stålplank_0.19"][`_${length}`].amount = fullLevels * plankPerU_Bom_0_19;
            break;
        }
    }
}

export function calculateSecondSide(length ){
    //add u-boms for stairs
    material["HS"][`_${length}`].amount += fullLevels * 4;
    material["HS"][`_2.07`].amount = 2;
    material["accesories"][`skarvtap`]["för_koppling"].amount = 1;
    material["spira"]["_1"].amount += 1

}

function addStairs(length){
    material["ALU-trappa"][`_${length}`].amount = fullLevels;
    material["trappräcke"][`_${length}`].amount = fullLevels;
    material["HS"][`_${length}`].amount += fullLevels + 1;
    material["accesories"][`fäste_för_trappräcke`].amount = 2;
    material["U-BOM"]["_0.73"].amount = (fullLevels * 2)
    material["platformlås"]["_0.73"].amount = (fullLevels * 2) + 2
    material["HS"]["_0.73"].amount = (fullLevels * 4) + 2
}

function getResultListOfMaterial(obj) {
const result = []
    function recursivePushing(currentObj){
        for (let key in currentObj) {
            if (typeof currentObj[key] === 'object' && currentObj[key] !== null && !Array.isArray(obj[key])) {
                recursivePushing(currentObj[key]);
            }else{
                result.push(currentObj);
                break;
            }  
        }
    }
    recursivePushing(obj);
    return result;
}



// function formateMaterial(startObj){
//     //objeckts will look like
//     // BSGledad:{ 
//     //     id: "017663025",
//     //     length: "0.6",
//     //     namn: "Plattformslås 0,39m förstärkt",
//     //     vikt: "5",
//     // }
//     for(let key in startObj){
       
//         if(typeof Object.values(startObj[key])[0] == "string"){
//             startObj[ key].amount =  0;
//         }else {
//             formateMaterial(startObj[key]);
//         }
//     } 
// }
// }


