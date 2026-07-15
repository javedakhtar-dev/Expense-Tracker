import { createContext, useEffect, useState } from 'react'
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider ({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await api.get('/user/me', {
                headers: {
                    Authorization: token
                }
            })
            setUser(response.data.user)
        } catch (err) {
            localStorage.removeItem("token");
            setUser(null);  
        } finally {
            setLoading(false)
        }
    }   

    useEffect(() => {
        async function checkAuth() {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }
            await fetchUser()
        }
        checkAuth();
    }, [])

    const login = async (token) => {
        localStorage.setItem('token', token);
        await fetchUser()
    }

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;