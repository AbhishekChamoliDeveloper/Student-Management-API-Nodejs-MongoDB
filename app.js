const express = require("express");
const mongoose = require("mongoose");
const Student = require("./model/studentModel");

const app = express();
app.use(express.json());

// Connecting to mongodb
mongoose
  .connect("DB URL", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected To MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/get-students-data", async (req, res) => {
  try {
    const data = await Student.find();

    res.status(200).json({
      status: "OK",
      data: data,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/create-student", async (req, res) => {
  try {
    const { name, age, contact } = req.body;

    const data = await Student.create({ name, age, contact });

    res.status(201).json({
      status: "OK",
      data: data,
    });
  } catch (err) {
    console.log(err);
  }
});

app.patch("/update-student/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const result = await Student.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });

    res.status(200).json({
      status: "OK",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete-student/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Student.deleteOne({ _id: id });

    res.status(200).json({
      status: "OK",
      message: "Student has been deleted",
    });
  } catch (err) {
    console.log(err);
  }
});

// App listening on port 8000
app.listen(8000, () => {
  console.log("Server has been started");
});

// Local host URL - http://localhost:8000 - /

// /get-student-data - http://localhost:8000/get-student-data

// /create-student - https://localhost:8000/create-student

// HTTP Request
// 1.get 2.post 3.delete 4.patch or update
