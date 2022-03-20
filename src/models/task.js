const mongoose = require('mongoose');
const { Schema } = mongoose;

// objeto
const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
});

// nombre del modelo y el modelo
module.exports = mongoose.model('Task', TaskSchema);