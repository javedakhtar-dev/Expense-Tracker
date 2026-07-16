const InputBox = ({placeholder, onChange, isRequired, inputType, value}) => {
    return (
        <input 
        value={value}
        type={inputType || "text" }
        placeholder={placeholder} 
        onChange={onChange}
        required={isRequired}
        className="border border-slate-200 focus:border-none p-2 rounded" 
        />
    )
}

export default InputBox;