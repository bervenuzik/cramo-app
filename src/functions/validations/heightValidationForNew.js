function heightValidationForNew(value){
    try{
        var formatedValue  = Number.parseFloat(value);
    }catch{
        return false;
    }
    if(formatedValue >= 2) return true;
    return false;
}

export default heightValidationForNew;