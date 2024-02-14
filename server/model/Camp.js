import mongoose from "mongoose";

const Schema = mongoose.Schema;

const classSchema = new Schema({
    title:
    {
        type: String,
        required: true,
    },
    subject:
    {
        type: String,
        required: true,
    },
    startDate:
    {
        type: String,
        required: true,
    },
    capacity:
    {
        type: Number,
        required: true
    },
    imageurl:
    {
        type: String,
        required: true,
    },
    classurl:
    {
        type: String,
        required: true,
    },
    students: [{ type: mongoose.Types.ObjectId, ref: "Student" }],
    faculties: [{ type: mongoose.Types.ObjectId, ref: "Faculty" }],
    tests: [{ type: mongoose.Types.ObjectId, ref: "Test" }]

});

export default mongoose.model("Class", classSchema);