const z = require('zod');

const userSignup = z.object({
    username: z.string().email("email is not valid"),
    firstName: z.string(),
    lastName: z.string().optional(),
    password: z.string().min(6, "Password too short!"),
})

const userSignin = z.object({
    username: z.string().email("email is not valid"),
    password: z.string().min(6, "Password too short!"),
})

const updateProfile = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional()
})

const updatePassword = z.object({
    oldPassword: z.string().min(6, "Password too short!"),
    newPassword: z.string().min(6, "Password too short!")
})

const addExpense = z.object({
    title: z.string().min(3, "Title too short!"),
    amount: z.number().min(0),
    category: z.enum([
    "Food",
    "Transport",
    "Shopping",
    "Entertainment",
    "Bills",
    "Health",
    "Salary",
    "Other"
    ]),
    type: z.enum(["income", "expense"]),
    date: z.string(),
    note: z.string().optional(),

})

const updateTransaction = z.object({
    title: z.string().min(3, "Title too short!").optional(),
    amount: z.number().min(0).optional(),
    category: z.enum([
    "Food",
    "Transport",
    "Shopping",
    "Entertainment",
    "Bills",
    "Health",
    "Salary",
    "Other"
    ]).optional(),
    type: z.enum(["income", "expense"]).optional(),
    date: z.string().optional(),
    note: z.string().optional(),

})

module.exports = {
    userSignup,
    userSignin,
    updateProfile,
    updatePassword,
    addExpense,
    updateTransaction
};