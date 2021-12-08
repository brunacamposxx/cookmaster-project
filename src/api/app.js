const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userRouter = require('./routes/userRouter');
const loginRoutes = require('./routes/loginRouter');
const recipeRoutes = require('./routes/recipeRouter');

const app = express();
app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/login', loginRoutes);
app.use('/recipes', recipeRoutes);
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

module.exports = app;
