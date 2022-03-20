const express = require('express');
const router = express.Router();

const TaskModel = require('../models/task')

// todas las tareas
router.get('/', async(req, res) => {
    // espera a la respuesta de la db asincrona
    const tasks = await TaskModel.find()
    console.log(tasks);
    res.json(tasks);
})

// obtiene 1 tarea por id
router.get('/:id', async(req, res) => {
    const task = await TaskModel.findById(req.params.id)
    res.json(task);
})

// guarda 1 tarea
router.post('/', async(req, res) => {
    // para evitar posts erroneos
    const { title, description } = req.body;
    const task = new TaskModel({ title, description })
        // guarda la nueva tarea
    await task.save();

    res.json({ status: 'Tarea guardada' })
})

//modifica una tarea
router.put('/:id', async(req, res) => {
    const { title, description } = req.body;
    const newTask = { title, description }

    await TaskModel.findByIdAndUpdate(req.params.id, newTask);
    res.json({ status: 'Task Updated' })
})

// elimina una tarea
router.delete('/:id', async(req, res) => {
    await TaskModel.findByIdAndRemove(req.params.id);
    res.json({ status: 'Task Deleted' })
})

module.exports = router;