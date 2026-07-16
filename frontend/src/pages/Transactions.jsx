import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import InputBox from "../components/ui/InputBox";
import api from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import AddTransactionModal from "../components/ui/AddTransactionModal";
import useDebounce from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState('')
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [type, setType] = useState("");
    const [sort, setSort] = useState("");
    const debouncedValue = useDebounce(search, 500)
    const navigate = useNavigate();
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
                params: {
                    search: debouncedValue,
                    category,
                    type,
                    sort,
                    page
                },
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            setTransactionsData(response.data)
            setLoading(false)
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    } 

    useEffect(() => {
        fetchTransactions();
    }, [debouncedValue, category, type, sort, page])

    const handleDelete = async (transactionId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (!confirmDelete) return;
        await api.delete(`/transactions/${transactionId}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        toast.success('Transaction deleted successfully');
        await fetchTransactions();
    }

    return (
        <div className="p-5 flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex gap-3">
                    <Button title={'Dashboard'} onClick={() => navigate('/')}/>
                    <Button title={'+ Add Transaction'} onClick={() => {
                        setMode('add');
                        setShowModal(true);
                    }}/>
                </div>
                <div>
                    <InputBox inputType={'search'} placeholder={'Search'} onChange={(e) => {
                        setSearch(e.target.value)
                        setPage(1)
                    }}/>
                </div>
                <div className="flex gap-3 pr-5">
                    <select name="Category" id="category" onChange={(e) => {
                        setCategory(e.target.value);
                        setPage(1)
                    }} className="border border-slate-200 p-1 rounded-lg">
                        <option value="">Category</option>
                        <option value="Food">Food</option>
                        <option value="Transport">Transport</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Bills">Bills</option>
                        <option value="Healdiv">Healdiv</option>
                        <option value="Salary">Salary</option>
                        <option value="Odiver">Odiver</option>
                    </select>
                    <select name="type" id="type" onChange={(e) => {
                        setType(e.target.value);
                        setPage(1);
                    }} className="border border-slate-200 p-1 rounded-lg">
                        <option value="">Type</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    <select name="sort" id="sort" onChange={(e) => {
                        setSort(e.target.value);
                        setPage(1)
                    }} className="border border-slate-200 p-1 rounded-lg">
                        <option value="">Sort</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="highest">Highest</option>
                        <option value="lowest">Lowest</option>
                    </select>
                    <ToastContainer />
                </div>
            </div>
            <div>
                {showModal && (
                    <AddTransactionModal close={() => setShowModal(false)} refreshTransactions={fetchTransactions} mode={mode} transaction={selectedTransaction}/>
                )}
                {loading ? (
                    <div>Fetching transactions...</div>
                ) : (
                    transactionsData.transactions < 1 ? (
                        <div>No transactions found.</div>
                    ) : (
                        <div className="border border-slate-200 rounded-lg">
                            <div className="grid grid-cols-6 p-2 font-bold">
                                    <div>Title</div>
                                    <div>Amount</div>
                                    <div>Category</div>
                                    <div>Type</div>
                                    <div>Date</div>
                                    <div className="text-center">Actions</div>
                            </div>
                            <div>
                                {transactionsData.transactions.map((transaction) => (
                                    <div key={transaction._id} className="border-t border-slate-200 grid grid-cols-6 p-2">
                                        <div className="text-start">{transaction.title}</div>
                                        <div>{transaction.amount}</div>
                                        <div>{transaction.category}</div>
                                        <div>{transaction.type}</div>
                                        <div>{new Date(transaction.date).toLocaleDateString()}</div>
                                        <div className="flex justify-center items-center gap-5">
                                            <FaPen onClick={() => {
                                                setMode('edit');
                                                setSelectedTransaction(transaction);
                                                setShowModal(true);
                                            }} className="cursor-pointer" />
                                            <MdDelete onClick={() => handleDelete(transaction._id)} className="cursor-pointer" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                )}
            </div>
            <div className="flex justify-center items-center gap-3">
                {transactionsData.page != 1 && <div className="border cursor-pointer text-slate-900 text-center rounded-lg hover:bg-slate-900 hover:text-white transition-all p-1 font-bold"
                onClick={() => setPage(page - 1)}
                >Previous</div>}
                {Array.from(
                    { length: transactionsData.totalPages },
                    (_, index) => (
                        <div key={index} 
                        onClick={() => setPage(index + 1)}
                        className={`h-8 w-8 border cursor-pointer text-slate-900 text-center rounded-full hover:bg-slate-900 hover:text-white transition-all p-1 font-bold ${transactionsData.page == index+1 && 'bg-slate-900 text-white'}`}
                        >{index+1}</div>
                    )
                )}
                {page != transactionsData.totalPages && <div 
                className="border cursor-pointer text-slate-900 text-center rounded-lg hover:bg-slate-900 hover:text-white transition-all p-1 font-bold"
                onClick={() => setPage(page + 1)}>Next</div>}
            </div>
        </div>
    )
}

export default Transactions;