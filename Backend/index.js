import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import cors from 'cors';


const app = express();
app.use(cors())

//MiddleWare for parsing request body
app.use(express.json());
// jashjkdhasdhkjashd
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome to my first mern stack project");
});

// Route for save a new book
app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields:title,author,publishYear",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App is connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

 
  app.listen(PORT, function(err){
      if (err) console.log("Error in server setup")
      console.log("Server listening on Port", PORT);
  })
