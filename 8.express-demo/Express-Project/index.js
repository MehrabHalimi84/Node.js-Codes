const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

let tasks = [
    { id: 1, title: 'task1', done: true },
    { id: 2, title: 'task2', done: false },
    { id: 3, title: 'task3', done: true },
    { id: 4, title: 'task4', done: false },
    { id: 5, title: 'task5', done: true },
];

app.get('/', (req, res) => {
    res.send('Hello world!!');
});


app.get('/api/tasks', (req, res) => {
    res.send(tasks);
});


app.get('/api/tasks/:id', (req, res) => {
    const task = tasks.find(c => c.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('The given ID was not found...');
    res.send(task);
});

app.post('/api/tasks', (req, res) => {
    const result = validateInput(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);
    const task = {
        id: tasks.length + 1,
        title: req.body.name,
        done: false
    }
    tasks.push(task);
    res.send(task);
});


app.put('/api/tasks/:id', (req, res) => {
    const task = tasks.find(c => c.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('The given ID was not found...');

    const result = validateInput(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    task.title = req.body.name;
    res.send(task);
});


app.delete('/api/tasks/:id', (req, res) => {
    const task = tasks.find(c => c.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('The given ID was not found...');

    const index = tasks.indexOf(task);
    const result = tasks.splice(index, 1);
    res.send(result);
});

function validateInput(tasks) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(tasks);
}


const port = process.env.PORT || 3000
app.listen(port, () => console.log('Listening to port 3000....'));