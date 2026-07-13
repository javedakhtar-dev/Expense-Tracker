const InputBox = ({placeholder, onChange}) => {
    return (
        <input 
        type="text" 
        placeholder={placeholder} 
        onChange={onChange}
        className="border border-slate-200 focus:border-none p-2"
        />
    )
}

export default InputBox;