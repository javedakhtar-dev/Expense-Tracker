import InputBox from "./InputBox"
import Button from "./Button"
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import api from "../../services/api";

const AddTransactionModal = ({close, refreshDashboard, refreshTransactions, mode, transaction}) => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [type, setType] = useState("");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);
    const isDisable = !title || !amount || !category || !type || !date;

    useEffect(() => {
    if (mode === "edit" && transaction) {
            setTitle(transaction.title);
            setAmount(transaction.amount);
            setCategory(transaction.category);
            setType(transaction.type);
            setDate(transaction.date.split("T")[0]);
            setNote(transaction.note);
        }
    }, [transaction, mode]);

    const resetForm = () => {
        setTitle("");
        setAmount("");
        setCategory("");
        setType("");
        setDate("");
        setNote("");
    }

    const handleSubmit = async () => {
        setLoading(true)
        if(mode === 'add') {
            try {
                await api.post("/transactions", {
                    title,
                    amount: Number(amount),
                    category,
                    type,
                    date,
                    note
                }, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                toast.success("Transaction added successfully!");
                resetForm();
                close();
                if(refreshDashboard) {
                    refreshDashboard();
                } else {
                    refreshTransactions();
                }
            } catch (err) {
                console.log(err);
                toast.error("Failed to add transaction");
            } finally {
                setLoading(false)
            }
        } else if (mode === 'edit') {
            try {
                await api.put(`/transactions/${transaction._id}`, {
                    title,
                    amount: Number(amount),
                    category,
                    type,
                    date,
                    note
                }, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                toast.success("Transaction updated successfully")
                resetForm();
                await refreshTransactions();
                close();
            } catch (err) {
                toast.error("Failed to update transaction");
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <div className="relative p-10 border border-slate-200 rounded-xl flex flex-col gap-5">
            <div className="flex flex-col gap-3">
                <InputBox placeholder={'Title'} isRequired={true} onChange={(e) => setTitle(e.target.value)} value={title}/>
                <InputBox placeholder={'Amount'} isRequired={true} onChange={(e) => setAmount(e.target.value)} value={amount}/>
                <select name="Category" id="category" onChange={(e) => setCategory(e.target.value)} className="border border-slate-200 rounded focus:border-none p-2" value={category}>
                    <option value="">--Select Category--</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Bills">Bills</option>
                    <option value="Health">Health</option>
                    <option value="Salary">Salary</option>
                    <option value="Other">Other</option>
                </select>
                <select name="type" id="type" onChange={(e) => setType(e.target.value)} className="border border-slate-200 rounded focus:border-none p-2" value={type}>
                    <option value="">--Select Type--</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <InputBox inputType={'date'} placeholder={'Date'} isRequired={true} onChange={(e) => setDate(e.target.value)} value={date}/>
                <InputBox placeholder={'Note'} isRequired={true} onChange={(e) => setNote(e.target.value)} value={note}/>
            </div>
            <div className="flex justify-between">
                <Button title={'Cancel'} onClick={close}/>
                <Button title={'Save Transaction'} onClick={handleSubmit} isDisabled={isDisable}/>
            </div>
        </div>
    )
}

export default AddTransactionModal;