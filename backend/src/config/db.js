const mongoose = require('mongoose');

try {
    mongoose.connect(process.env.DATABASE_URL || "")
    .then(() => console.log("Database connected successfully"));
} catch (err) {
    console.log(err);
}

const UserSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
})

const ExpenseSchema = mongoose.Schema({
    title: {type: String, required: true},
    amount: {type: Number, required: true, min: 0},
    category: {type: String, required: true},
    type: {type: String, enum: ["income", "expense"], required: true},
    date: {type: Date, required: true},
    note: {type: String, default: ""},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

const User = mongoose.model('users', UserSchema);
const Expense = mongoose.model('expenses', ExpenseSchema);

module.exports = {
    User, Expense
};