import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import api from "../services/api";
import Button from "../components/ui/Button";
import InputBox from "../components/ui/InputBox";
import useAuth from "../hooks/useAuth";

const Signin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const navigate = useNavigate();
    const notify = () => toast.error("Something's up!")

    const handleSubmit = async () => {
        try {
            const res = await api.post('/user/signin', {
                username,
                password
            })
            await login(res.data.token)
            navigate('/');
        } catch (err) {
            notify();
            console.log(err);
        }
    }

    return (
        <div className="flex justify-center items-center w-full h-screen">
            <div className="p-20 rounded-lg border border-slate-200 shadow-xs text-center flex flex-col gap-5">
                <div>
                    <div className="text-2xl font-bold">Login</div>
                    <div className="text-slate-600">Login to proceed</div>
                </div>
                <div className='flex flex-col gap-3'>
                    <InputBox placeholder={"Email"} onChange={(e) => setUsername(e.target.value)}/>
                    <InputBox placeholder={"Password"} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <Button title={'Login'} onClick={handleSubmit}/>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default Signin;