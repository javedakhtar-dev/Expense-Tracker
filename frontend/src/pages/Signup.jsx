import { useState } from 'react';
import InputBox from '../components/ui/InputBox'
import Button from '../components/ui/Button'
import api from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const notify = () => toast.error("Something's up!")

    const handleSubmit = async () => {
        try {
            const res = await api.post('/user/signup', {
                username,
                firstName,
                lastName,
                password
            })
            .then(() => {
                localStorage.setItem('token', res.data.token);
                navigate('/');
            })
        } catch (err) {
            notify();
            console.log(err);

        }
        
    }

    return (
        <div className="flex justify-center items-center w-full h-[90vh]">
            <div className="p-10 rounded-lg border border-slate-200 shadow-xs text-center flex flex-col gap-5 min-w-lg">
                <div>
                    <div className="text-2xl font-bold">Signup</div>
                    <div className="text-slate-600">Signup to proceed</div>
                </div>
                <div className='flex flex-col gap-3'>
                    <InputBox placeholder={"Email"} onChange={(e) => setUsername(e.target.value)}/>
                    <InputBox placeholder={"First Name"} onChange={(e) => setFirstName(e.target.value)}/>
                    <InputBox placeholder={"Last Name"} onChange={(e) => setLastname(e.target.value)}/>
                    <InputBox placeholder={"Password"} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <Button title={'Sign up'} onClick={handleSubmit}/>
                    <ToastContainer />
                </div>
                <div>Already have an account? <span className="text-sky-500 cursor-pointer " onClick={() => navigate('/signin')}>Login</span></div>
            </div>
        </div>
    )
}

export default Signup;