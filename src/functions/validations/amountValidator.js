function amountValidator(amount){
    const isAmountValid = /^\d+$/.test(amount);
    return isAmountValid;
}

export default amountValidator