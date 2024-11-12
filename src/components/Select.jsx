function Select({options , id , lable , onChange , value}) {
    return ( <div>
    <label htmlFor={id}>{lable}</label>

<select onChange={(ev)=>{onChange(ev.target.value)}} id={id} value={value}>
    {options.map((option , index)=>{
     return <option key={option+""+index} value={option}>{option}</option>
    })}
</select>
    </div> );
}

export default Select;