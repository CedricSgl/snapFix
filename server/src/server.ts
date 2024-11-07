import express, { Request, Response } from "express";
import { connectDB } from "./config/database";
import bodyParser from "body-parser";
import newsletterForm from "./routes/newsletterForm";
import users from "./routes/user";
import cors from "cors";

const app = express();
app.use(cors());

connectDB();

// Express configuration
app.set("port", process.env.PORT || 5050);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// @route   GET /
// @desc    Test Base API
// @access  Public
app.get("/", (_req, res) => {
    res.send("API Running");
});

app.use("/newsletterForm", newsletterForm);
app.use("/users", users);

const port = app.get("port");
export const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);