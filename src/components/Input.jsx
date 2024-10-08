

function Input({label, onChange, type , ...props}){
    const inputStyles  = "w-full outline-none p-[8px] rounded-md focus:bg-slate-300 transition-colors invalid:bg-red-400 border-[1px] border-solid border-stone-900";
    if(type =="number") inputStyles + "appearance-auto"
return(
    
    <span className="flex flex-col gap-2 w-full">
        <label className="uppercase text-stone-950 md:text-l p-3 pl-0 border-">{label}</label>
        <input type={type} onChange={(ev)=>onChange(ev)} className={inputStyles} {...props}/>
    </span>
    

)

}


export default Input;