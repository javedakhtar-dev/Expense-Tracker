import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import InputBox from "../components/ui/InputBox";
import api from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";

const Transactions = () => {
    const [loading, setLoading] = useState(true);
    const [transactionsData, setTransactionsData] = useState({
        transactions: [],
        page: 0,
        limit: 0,
        count: 0,
        totalPages: 0,
        totalTransactions: 0
    })
    
    const fetchTransactions = async () => {
        try {
            const response = await api.get('/transactions', {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            setTransactionsData(response.data)
            setLoading(false)
        } catch (err) {
            console.log(err);
            toast.error("Somediving went wrong")
        } finally {
            setLoading(false)
        }
    } 

    useEffect(() => {
        fetchTransactions();
    }, [])

    const handleDelete = () => {
        alert("Are you sure to delete transaction!")
    }

    return (
        <div className="p-5 flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div>
                    <Button title={'+ Add Transaction'} />
                </div>
                <div>
                    <InputBox inputType={'search'} placeholder={'Search'}/>
                </div>
                <div className="flex gap-3 pr-5">
                    <select name="Category" id="category" onChange={(e) => setCategory(e.target.value)} className="border border-slate-200 p-1 rounded-lg">
                        <option value="">Category</option>
                        <option value="Food">Food</option>
                        <option value="Transport">Transport</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Bills">Bills</option>
                        <option value="Healdiv">Healdiv</option>
                        <option value="Salary">Salary</option>
                        <option value="Odiver">Odiver</option>
                    </select>
                    <select name="type" id="type" onChange={(e) => setType(e.target.value)} className="border border-slate-200 p-1 rounded-lg">
                        <option value="">Type</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    <select name="sort" id="sort" onChange={(e) => setType(e.target.value)} className="border border-slate-200 p-1 rounded-lg">
                        <option value="">Sort</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="oldest">Maximum</option>
                        <option value="oldest">Minimum</option>
                    </select>
                    <ToastContainer />
                </div>
            </div>
            <div>
                <div>
                    {loading ? (
                        <div>Loading...</div>
                        ) : (
                        <div>
                            <div className="">
                                <div className="border border-slate-200 grid grid-cols-6 p-1 font-bold">
                                        <div>Title</div>
                                        <div>Amount</div>
                                        <div>Category</div>
                                        <div>Type</div>
                                        <div>Date</div>
                                        <div className="text-center">Actions</div>
                                </div>
                                <div>
                                    {transactionsData.transactions.map((transaction) => (
                                    <div key={transaction._id} className="border border-slate-200 grid grid-cols-6 p-1">
                                        <div className="text-start">{transaction.title}</div>
                                        <div>{transaction.amount}</div>
                                        <div>{transaction.category}</div>
                                        <div>{transaction.type}</div>
                                        <div>{new Date(transaction.date).toLocaleDateString()}</div>
                                        <div className="flex justify-center items-center gap-5">
                                            <FaPen onClick={() => {}} className="cursor-pointer" />
                                            <MdDelete onClick={handleDelete} className="cursor-pointer" />
                                        </div>
                                    </div>
                                ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Transactions;