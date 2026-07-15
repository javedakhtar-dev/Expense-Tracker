const Button = ({title, onClick, isDisabled}) => {
    return (
        <button 
        className="bg-slate-900 text-white ring-2 ring-slate-900 hover:bg-white hover:text-slate-900 rounded-lg px-5 py-2 cursor-pointer transition-all font-bold disabled:ring-none disabled:bg-slate-900/30 disabled:pointer-events-none"
        onClick={onClick}
        disabled={isDisabled}
        >{title}</button>
    )
}

export default Button;