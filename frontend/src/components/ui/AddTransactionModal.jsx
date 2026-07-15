import InputBox from "./InputBox"
import Button from "./Button"
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import api from "../../services/api";

const AddTransactionModal = ({close, refreshDashboard }) => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [type, setType] = useState("");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);
    const isDisable = !title || !amount || !category || !type || !date;
    const notify = () => toast("Transaction added successfully!");

    const handleSubmit = async () => {
        setLoading(true)
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
            setLoading(false);
            notify();
            close();
            setTitle("");
            setAmount("");
            setCategory("");
            setType("");
            setDate("");
            setNote("");
            await refreshDashboard();
        } catch (err) {
            toast.error("Failed to add transaction");
        } finally {
            setLoading(false)
        }
    }
    console.log(isDisable)
    console.log({
        title,
        amount,
        category,
        type,
        date
    });

    return (
        <div className="relative p-10 border border-slate-200 rounded-xl flex flex-col gap-5">
            <div className="flex flex-col gap-3">
                <InputBox placeholder={'Title'} isRequired={true} onChange={(e) => setTitle(e.target.value)}/>
                <InputBox placeholder={'Amount'} isRequired={true} onChange={(e) => setAmount(e.target.value)}/>
                <select name="Category" id="category" onChange={(e) => setCategory(e.target.value)} className="border border-slate-200 rounded focus:border-none p-2">
                    <option value="">--Select Category--</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Bills">Bills</option>
                    <option value="Health">Health</option>
                    <option value="Salary">Salary</option>
                    <option value="Other">Other</option>
                </select>
                <select name="type" id="type" onChange={(e) => setType(e.target.value)} className="border border-slate-200 rounded focus:border-none p-2">
                    <option value="">--Select Type--</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <InputBox inputType={'date'} placeholder={'Date'} isRequired={true} onChange={(e) => setDate(e.target.value)}/>
                <InputBox placeholder={'Note'} isRequired={true} onChange={(e) => setNote(e.target.value)}/>
            </div>
            <div className="flex justify-between">
                <Button title={'Cancel'} onClick={close}/>
                <Button title={'Save Transaction'} onClick={handleSubmit} isDisabled={isDisable}/>
            </div>
        </div>
    )
}

export default AddTransactionModal;