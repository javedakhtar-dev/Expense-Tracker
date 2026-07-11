const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const { addExpense, updateTransaction } = require('../../utils/types');
const { Expense } = require('../../config/db');

const router = express.Router();
router.use(authMiddleware);

router.post('/', async (req, res) => {
    const expenseInputPayload = req.body;
    const parsedPayload = addExpense.safeParse(expenseInputPayload);

    if(!parsedPayload.success) {
        return res.status(409).json({
            error: "Inputs are not correct"
        })
    }

    try {
        const { title, amount, category, type, date, note } = parsedPayload.data;
        const expense = await Expense.create({
            title,
            amount,
            category,
            type,
            date,
            note,
            userId: req.userId
        }) 

        return res.json({
            msg: "Expence created successfully"
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Something went wrong"
        })
    }
})

router.get('/', async (req, res) => {
    try {
        const transaction = await Expense.find({
            userId: req.userId
        })

        res.json({
            transaction
        })
    } catch (err) {
        return res.status(409).json({
            error: "Something went wrong"
        })
    }
})

router.put('/:id', async (req, res) => {
    const transactionId = req.params.id;
    const updateTransactionPayload = req.body;
    const parsedPayload = updateTransaction.safeParse(updateTransactionPayload);

    if(!parsedPayload.success) {
        return res.status(400).json({
            error: "Invalid inputs"
        })
    }

    try {
        const { title, amount, category, type, date, note } = parsedPayload.data; 
        const updatedTransaction = await Expense.updateOne({
            _id: transactionId,
            userId: req.userId
        }, {
            $set: {
                title,
                amount,
                category,
                type,
                date,
                note
            }
        })

        if (updatedTransaction.matchedCount === 0) {
            return res.status(404).json({
                error: "Transaction not found"
            });
        }

        return res.json({
            msg: "Transaction updated successfully"
        })
    } catch (err) {
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
})

router.delete('/:id', async (req, res) => {
    const expenseId = req.params.id;
    try {
        const deleteTransaction = await Expense.deleteOne({
            _id: expenseId,
            userId: req.userId
        })

        if(deleteTransaction.matchedCount === 0){
            return res.status(404).json({
                error: "Transaction not found"
            });
        }

        return res.json({
            msg: "Transaction deleted successfully"
        })

    } catch (err) {
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
})

module.exports = router;
