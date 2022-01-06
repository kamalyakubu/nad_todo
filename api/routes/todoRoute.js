import express from "express";
//import mongoose from 'mongoose';
import Todo from "../model/todoModel.js";

const router = express.Router();
const app = express();


//get all todos
// router.get("/", async (req, res) => {
//   try {
//     const todos = await Todo.find({});
//     res.status(200).json({
//       message: "request was successful",
//       data: todos,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// });



// router.route("/").get((req,res) => {
//      res.send('Welcome back Express');
//  })

router.route("/todos")
.get( async (req, res) => {
     
  const todos = await Todo.find({});
  if(todos) {
   return res.status(200).json({
       status: true,
      message: "request was successful",
      data: todos,
    });
  } else {
   return res.status(400).json({
       status: false,
      message: "Server error",
    });
  }
});


//create a todo

router.route("/todo").post(async (req, res) => {
  const { title, description, date_time } = req.body;

  try {
    const todoModel = await Todo.create({
      title,
      description,
      date_time,
    });

    res.status(201).json({
      message: "message was sent successfuly",
      _data: todoModel,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "your request was shit. Try again",
    });
  }
});

//update a to todo
router.patch("/:id", async (req, res) => {
  const body = req.body;
  const { id } = req.params;

  try {
    const todos = await Todo.updateOne({ _id: id }, { $set: { _body: body } });
    res.status(200).json({
      message: "todo was updated",
      data: todos,
    });
  } catch (error) {
    res.status(400).json({
      message: "todo was not able to updated",
    });
  }
});

//delete a todo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const todos = await Todo.findByIdAndDelete(id);
    res.status(200).json({
      message: "todo was deleted",
      data: todos,
    });
  } catch (error) {
    res.status(400).json({
      message: "todo was not able to delete",
    });
  }
});

export default router;
