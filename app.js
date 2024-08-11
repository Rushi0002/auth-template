import express from "express";
import morgan from "morgan";
import createHttpError from "http-errors";
import dotenv from "dotenv";
import AuthRoute from "./Routes/auth.route.js";
import Connection from "./Helpers/Connection.js";

dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

//mongodb connection
Connection();

app.get("/", async (req, res, next) => {
  res.send("Hello");
});

app.use("/auth", AuthRoute);

app.use(async (req, res, next) => {
  //   next(createHttpError.NotFound("This route does not exist"));
  next(createHttpError.NotFound());
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: {
      status: error.status || 500,
      message: error.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
