const InputBox = ({placeholder, onChange, isRequired, inputType}) => {
    return (
        <input 
        type={inputType || "text" }
        placeholder={placeholder} 
        onChange={onChange}
        required={isRequired}
        className="border border-slate-200 focus:border-none p-2"
        />
    )
}

export default InputBox;