const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String,required: true },
    phone: { type: Number,required: true },
    password: { type: String, required: true },
    programme: { type: String, required: true },
    department: { type: String, required: true },
    year: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;