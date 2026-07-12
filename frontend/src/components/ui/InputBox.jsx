const InputBox = ({placeholder, onChange}) => {
    return (
        <input 
        type="text" 
        placeholder={placeholder} 
        onChange={onChange}
        className=""
        />
    )
}

export default InputBox;