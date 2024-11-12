function lengthValidationForNew(value){
    try{
        var formatedValue  = Number.parseFloat(value);
        console.log(formatedValue)
    }catch{
        return false;
    }
    if(formatedValue == 2.57 || formatedValue == 3.07) return true;
    return false;
}

export default lengthValidationForNew;