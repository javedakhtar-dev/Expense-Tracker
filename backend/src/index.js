const express = require('express');
const app = express();
const mainRoute = require('./routes/index')

app.use(express.json());
app.use('/api/v1', mainRoute);

app.listen(3000, () => console.log("Server running on port 3000"));