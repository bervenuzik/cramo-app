

function Input({label, onChange =()=>{}, type = "text" ,error = false, errorMessage = "", value,alt = "",style, ...props}){
    // const spanClasses = `flex flex-col ${label? "gap-2": null}  w-full h-fit`
    const inputClasses  = "w-full outline-none p-[8px] rounded-md focus:bg-slate-300 transition-colors invalid:bg-red-400 border-[1px] border-solid border-stone-900";
    if(type =="number") inputClasses + "appearance-auto"

    function handleKeyDown(event) {
        const allowedKeys = ["Backspace" ,"ArrowUp" , "ArrowDown" ,"ArrowLeft" ,"ArrowRight" ]
        if (!event.key.match(/[1234567890,]/)&& !allowedKeys.includes(event.key)) {
          event.preventDefault();
        }
      }


return(
    
     <span >
        {label? <label className="uppercase text-stone-950 md:text-l p-3 pl-0 border-">{label}</label> : null}
        <input onKeyDown={handleKeyDown} style={style} alt={alt} type={type} onChange={(event)=>{onChange(event.target.value)}} className={inputClasses} value={value} {...props}/>
        {error? <p className="text-red-500">{errorMessage}</p> : null}
     </span>
)

}


export default Input;