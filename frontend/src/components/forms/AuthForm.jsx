import InputBox from '../ui/InputBox'
import Button from '../ui/Button'

const AuthForm = ({action}) => {
    return (
        <div>
            {action == 'signup' && <div>
                <InputBox placeholder={"First Name"} />
                <InputBox placeholder={"Last Name"} />
            </div>}
            <InputBox placeholder={"Email"} />
            <InputBox placeholder={"Password"} />
            <Button title={(action=='signup') ? "Signup" : "Login"} onClick={}/>
        </div>
    )
}

export default AuthForm;