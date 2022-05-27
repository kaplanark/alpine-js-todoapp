const express = require('express');
const path = require('path')
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const port = 5000
dotenv.config();

var bodyParser = require("body-parser");
app.use(bodyParser.json());


const Todo = require('./models/todo');
app.use(express.static("public"));
app.use(cors());

app.get('/todolist', (req, res) => {
    Todo.find({}, (err, found) => {
        if (err) { console.log(err); }
        res.send(found);
    })
})
app.post('/todolist', async (req, res) => {
    const { id, done } = req.body;
    const data = {
        done: done,
    }
    await Todo.findByIdAndUpdate({ _id: id }, data)
        .then((data) => {
            res.status(201).json(data)
        })
        .catch((err) => {
            console.log(err);
        });
})
app.post('/addtodo', async (req, res) => {
    const { newTodo } = req.body;
    await Todo.create({ text: newTodo }).then((data) =>
        res.status(201).json(data)
    )

});

app.post('/deletetodo', async (req, res) => {
    const { id } = req.body;
    await Todo.deleteOne({ id: id }).then((data) =>
        res.status(201).json(data)
    )

});
mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err) {
    if (err) {
        return console.log(err);
    } else {
        console.log("___Mongoose connetcion");
    }
});
app.listen(port, () => {
    console.log(`___Server listening on port ${port}`)
})