import widthOptions from "../../data/widthOptions";
function widthValidationForNew(value){
    try{
        var formatedValue  = Number.parseFloat(value);
    }catch{
        return false;
    }
    return widthOptions.includes(formatedValue);
}

export default widthValidationForNew;