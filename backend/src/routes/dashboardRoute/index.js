const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const { Expense } = require('../../config/db');
const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    let balance = 0;
    let totalIncome = 0;
    let totalExpense = 0;

    try {
        const transactions = await Expense.find({
            userId: req.userId
        }, {
            title: true,
            amount: true,
            type: true
        }).sort({
            createdAt: -1
        })

        transactions.map((transaction) => {
            if(transaction.type == 'expense'){
                totalExpense += transaction.amount
            } else if(transaction.type == 'income') {
                totalIncome += transaction.amount
            }
        })

        balance = totalIncome - totalExpense

        return res.json({
            balance,
            totalIncome,
            totalExpense,
            transactions
        })
    } catch (err) {
        res.status(500).json({
            error: "Something went wrong"
        })
    }
})

module.exports = router;