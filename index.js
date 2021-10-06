const mongoose = require('mongoose');


//1st parameter -> connection path
mongoose.connect('mongodb://localhost:27017/my-students', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to MongoDB Successfully"))
    .catch(err => console.error("Connection Failed!!"));


//Schema -> Defines the shape Documents
const studentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    dob: Date,
    entryDate: { type: Date, default: Date.now },
    passed: Boolean,
    hobbies: [String],
    parents: {
        father: String,
        mother: String,
    },
    subjects: [{ name: String, marks: { type: Number, min: 0, max: 100 } }]

});

//mongoose model
const Student = mongoose.model('Student', studentSchema);
/*
const student = new Student({
    firstName: "Abdullah Al",
    lastName: "Noman",
    dob: new Date("03 Febuary 1997"),
    passed: true,
    hobbies: ["Swiming", "Cycling"],
    parents: {
        father: "Abu Yousuf",
        mother: "Nazma Akter"
    },
    subjects: [{ name: "Math", marks: "91" }, { name: "Graphics", marks: "93" }]
});

student.save()
    .then(data => console.log(data))
    .catch(err => console.log(err._message));

    */


//create    
//async wait 
async function createStudent() {
    const student = new Student({
        firstName: "Abdur",
        lastName: "Rahman",
        dob: new Date("03 June 1998"),
        passed: true,
        hobbies: ["Swiming", "Cycling"],
        parents: {
            father: "Nurul Amin",
            mother: "Momotaz"
        },
        subjects: [{ name: "Accounting", marks: "91" }, { name: "Marketing", marks: "93" }]
    });
    const data = await student.save();
    console.log(data);
}
//createStudent();

//Read data
async function readData() {
    const studentData = await Student.find();//limit() sort() select({firstName:1,lastName:1})
    console.log(studentData);
}

readData();

async function updateData(id) {
    //receive 2 paratmeters ,1st ->
    const studentUpdate = await Student.updateOne(
        { _id: id },
        { $set: { passed: false } });
    console.log(studentUpdate);
}
updateData('615c7de38b7dbd01f4a77fa7');

