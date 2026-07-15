const TransactionCard = ({transaction}) => {
    return (
        <div className="border border-slate-200 rounded-xl p-3 grid grid-cols-3">
            <div className="font-bold">{transaction.title}</div>
            <div>{transaction.type}</div>
            <div className={`${transaction.type == 'expense' ? 'text-red-500' : 'text-green-500'}`}>{transaction.amount}</div>
        </div>
    )
}

export default TransactionCard;