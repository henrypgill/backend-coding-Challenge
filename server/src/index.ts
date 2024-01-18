import cors from "cors";
import express from "express";
import morgan from "morgan";

const app = express()

app.use(express.json())
.use(cors())
.use(morgan("tiny"))

app.get("/", async (_req, res, next) => {
    res.json({ msg: "Hello! There's nothing interesting for get/" });
    next();
  });



  const port = 4000
  app.listen(port, () => {
    console.log(
      `Server started listening for HTTP requests on port ${port}.  Let's go!`
    );
  });
