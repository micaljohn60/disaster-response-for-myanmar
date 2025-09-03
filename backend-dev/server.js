const express = require("express");

const dotenv = require("dotenv");
const cors = require("cors");
const apiRoute = require("./routes/api");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, ".env") });

// Connect to database
connectDB();

const app = express();
const port = process.env.PORT || 5001;
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

app.use("/api/missingperson/", apiRoute);

app.listen(port, () => {
  console.log(`Server is running on port 5001`);
});

module.exports = app;
