import Button from "../components/ui/Button";
import InputBox from "../components/ui/InputBox";

const Transactions = () => {
    return (
        <div>
            <div>
                <InputBox inputType={'search'} placeholder={'Search'}/>
            </div>
            <select name="Category" id="category" onChange={(e) => setCategory(e.target.value)} className="border-slate-200">
                    <option value="">--Select Category--</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Bills">Bills</option>
                    <option value="Health">Health</option>
                    <option value="Salary">Salary</option>
                    <option value="Other">Other</option>
                </select>
                <select name="type" id="type" onChange={(e) => setType(e.target.value)}>
                    <option value="">--Select Type--</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <select name="sort" id="sort" onChange={(e) => setType(e.target.value)}>
                    <option value="">--Sort--</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <Button title={'+ Add Transaction'} />
        </div>
    )
}

export default Transactions;