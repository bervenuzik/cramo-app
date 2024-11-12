

function Button({children , onClick , ...props}){
    return(
        <button {...props} onClick={onClick} className="py-2 px-4 bg-slate-950 text-stone-100 uppercase mt-3 rounded-md hover:bg-slate-700 transition-colors">{children}</button>
    )
}

export default Button;