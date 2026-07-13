const Button = ({title, onClick}) => {
    return (
        <button 
        className="bg-slate-900 text-white ring-2 ring-slate-900 hover:bg-white hover:text-slate-900 rounded-lg px-5 py-2 cursor-pointer transition-all font-bold"
        onClick={onClick}
        >{title}</button>
    )
}

export default Button;