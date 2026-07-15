import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from './../hooks/useAuth'
import api from '../services/api'
import TransactionCard from '../components/ui/TransactionCard'
import Button from '../components/ui/Button'
import AddTransactionModal from '../components/ui/AddTransactionModal'

const Dashboard = () => {
    const { user } = useAuth()
    const [showModal, setShowModal] = useState(false);
    const [dashboardInfo, setDashboardInfo] = useState({
        balance: 0,
        totalIncome: 0,
        totalExpense: 0,
        transactions: []
    });
    const navigate = useNavigate();

    const dashboardData = async () => {
        const response = await api.get('/dashboard', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        setDashboardInfo(response.data);
    }
    
    useEffect(() => {
        dashboardData();
    }, [])

    return (
        <div className='border border-slate-200 p-5 m-2 rounded-lg flex flex-col gap-5'>
            <div>
                <div className='font-black text-2xl'>Hello, {user.firstName}!</div>
            </div>
            <div className='border border-slate-200 p-3 rounded-lg flex flex-col gap-3'>
                <div className={`font-bold text-xl`}>Total Balance: <span className={`${dashboardInfo.balance < 1 && 'text-red-600'}`}>{dashboardInfo.balance}</span></div>
                <div>Total Income: <span className='text-green-600'>{dashboardInfo.totalIncome}</span></div>
                <div>Total Expense: <span className='text-red-600'>{dashboardInfo.totalExpense}</span></div>
            </div>
            {showModal && (
                <AddTransactionModal close={() => setShowModal(false)} refreshDashboard={dashboardData}/>
            )}
            <div className='border border-slate-200 p-5 rounded-lg flex flex-col gap-5'>
                <div className='flex justify-between items-center'>
                    <div className='font-bold text-xl'>Recent Transactions</div>
                    <div onClick={() => navigate('/transactions')} className='cursor-pointer underline'>View all</div>
                </div>
                <div className='flex flex-col gap-3'>
                    {dashboardInfo.transactions.map((transaction) => <TransactionCard key={transaction._id} transaction={transaction}/>)}
                </div>
            </div>
            <Button title={'+ Add Transaction'} onClick={() => setShowModal(true)}/>

        </div>
    )
}

export default Dashboard;