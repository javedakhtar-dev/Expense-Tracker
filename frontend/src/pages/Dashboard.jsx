import { useEffect, useState } from 'react'
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
        <div>
            <div>
                <div>Hello, {user.firstName}!</div>
            </div>
            <div>
                <div>Total Balance: {dashboardInfo.balance}</div>
                <div>Total Income: {dashboardInfo.totalIncome}</div>
                <div>Total Expense: {dashboardInfo.totalExpense}</div>
            </div>
            {showModal && (
                <AddTransactionModal close={() => setShowModal(false)} refreshDashboard={dashboardData}/>
            )}
            <div>
                <div>Recent Transactions</div>
                <div className='flex flex-col gap-3 p-5'>
                    {dashboardInfo.transactions.map((transaction) => <TransactionCard key={transaction._id} transaction={transaction}/>)}
                </div>
            </div>
            <Button title={'+ Add Transaction'} onClick={() => setShowModal(true)}/>

        </div>
    )
}

export default Dashboard;