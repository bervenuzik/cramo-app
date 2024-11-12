function Select({options , id , lable , onChange , value}) {
    return ( <div className="flex gap-2 items-center">
    <label className="uppercase" htmlFor={id}>{lable}</label>
    
<select className="p-3 rounded-md border-[1px] border-solid border-stone-900" onChange={(ev)=>{onChange(ev.target.value)}} id={id} value={value}>
    {options.map((option , index)=>{
     return <option key={option+""+index} value={option}>{option}</option>
    })}
</select>
    </div> );
}

export default Select;