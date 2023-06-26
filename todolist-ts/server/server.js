const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const ToDo = require('./models/todo');
const ConnectDB = require('./db/dbConnection');

const app = express();
const PORT = 3030;

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//get all todos
app.get('/todo', async (req, res, next) => {
    try {
        const allTodos = await ToDo.find();
        res.send(allTodos);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

// create a Todo
app.post('/todo', async (req, res, next) => {
    try {
        const newTodo = new ToDo(req.body);
        const response = await newTodo.save();
        res.status(201).send(response._id);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

// clear all todos
app.delete('/todo/all', async (req, res, next) => {
    try {
        await ToDo.deleteMany({});
        res.status(200).send();
    } catch (err) {
        console.log(err);
        next(err);
    }
});

// delete a Todo
app.delete('/todo/:id', async (req, res, next) => {
    try {
        await ToDo.deleteOne({ _id: req.params.id });
        res.status(200).send();
    } catch (err) {
        console.log(err);
        next(err);
    }
});


// toggle isCompleted
app.put('/todo/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await ToDo.updateOne({ _id: id }, { $set: { isCompleted: req.body.isCompleted } });
        res.status(200).send({ message: "Success" });
    } catch (err) {
        console.log(err);
        next(err);
    }
});

//error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err);
});

app.listen(PORT, () => {
    try {
        ConnectDB();
    } catch (error) {
        console.warn("Connection to database failed. Error: ", error);
    }
    console.log("Listening on port ", PORT);
});