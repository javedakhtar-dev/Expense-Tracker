import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { IoLogOut, IoSettings } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

const Menubar = () => {
    const { login, user, logout } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    return (
        <div>
            {login && (
                <div className="grid grid-cols-3 flex items-center">
                    <div></div>
                    <div className="flex justify-center items-center gap-5 p-3">
                        <div onClick={() => navigate('/')} className="p-2 rounded-lg border border-slate-500 cursor-pointer font-bold">Dashboard</div>
                        <div onClick={() => navigate('/transactions')} className="p-2 rounded-lg border border-slate-500 cursor-pointer font-bold">Transactions</div>
                    </div>
                    <div className="relative flex justify-end items-center gap-5 mr-10">
                        <div className="font-black bg-slate-900 h-8 w-8 cursor-pointer text-white rounded-full flex justify-center items-center" onClick={() => setShowMenu(e => !e)}></div>
                        {showMenu && (
                            <div className="absolute right-0 mt-50 w-48 rounded-lg border border-slate-200 bg-white shadow-lg">
                                <div className="p-5 flex flex-col gap-2">
                                    <div className="cursor-pointer border border-slate-200 p-1 rounded-lg flex gap-2 items-center" onClick={() => navigate('/profile')}>Profile<FaUser /></div>
                                    <div className="cursor-pointer border border-slate-200 p-1 rounded-lg flex gap-2 items-center" onClick={() => navigate('/settings')}>Settings<IoSettings /></div>
                                    <div className="cursor-pointer border border-slate-200 p-1 rounded-lg flex gap-2 items-center" onClick={logout}>Logout <IoLogOut /></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Menubar;