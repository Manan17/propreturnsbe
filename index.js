const express = require("express");
const connectDb = require("./db");
const cors = require("cors");
const app = express();
const router = require("./routes");
const PORT = 4093;
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
connectDb();

app.use("/api", router);

app.get("/api/health", (req, res) => {
  res.json({
    message: "SUCCESS",
  });
});

app.listen(PORT, () => console.log("Listening at 4093"));
