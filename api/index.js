const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error Connecting to MongoDb", error);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running...`);
});

const Habit = require("./models/habit")

//endpoint to create habit in backend

app.post("/habits", async(req,res) => {
  try{
    const {title, color, repeatMode, reminder} = req.body;

    const newHabit = new Habit({
      title, 
      color,
      repeatedMode,
      reminder
    })

    const savedHabit = await newHabit.save();
    res.status(200).json(savedHabit)

  } catch(error){
    res.status(500).json({error:"Network error"})
  }
})