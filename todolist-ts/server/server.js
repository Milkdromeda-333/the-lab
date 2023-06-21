const express = require('express');
const morgan = require('morgan');
const ConnectDB = require('./db/dbConnection');
const mongoose = require('mongoose');
const Todo = require('./models/todo');

const app = express();
const PORT = 3030;

app.use(morgan('dev'));
app.use(express.json());

//get all todos
app.get('/todo', async (req, res, next) => {
    try {
        const allTodos = await Todo.find();
        res.send(allTodos);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

// create a Todo
app.post('/todo', async (req, res, next) => {
    try {
        const newTodo = new Todo(req.body);
        const response = await newTodo.save();
        res.status(201).send(response._id);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

// delete a Todo
app.delete('/todo/:id', async (req, res, next) => {
    try {
        await Todo.deleteOne({ _id: req.params.id });
        res.status(200).send();
    } catch {
        console.log(err);
        next(err);
    }
});

//error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status).send(err.message);
});

app.listen(PORT, () => {
    try {
        ConnectDB();
    } catch (error) {
        console.warn("Connection to database failed. Error: ", error);
    }
    console.log("Listening on port ", PORT);
});