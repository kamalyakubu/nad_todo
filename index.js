import express from "express";
import todos from "./api/routes/todoRoute.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";



dotenv.config();

const app = express();
const db = process.env.DB_URL;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("database is connected live");
  })
  .catch((error) => `unable to connect ${error.message}`);

const port = process.env.P0RT || 3000;

app.use(express.json());
app.use(cors());
app.use("/todos", todos);

// app.get('/',(req,res) => {
//      res.send('Welcome back Express');
//  })







app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
