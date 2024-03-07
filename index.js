const express = require("express");
const connectDb = require("./db");
const app = express();
const router = require("./routes");
const PORT = 4093;
app.use(express.json());
connectDb();

app.use("/api", router);

app.get("/api/health", (req, res) => {
  res.json({
    message: "SUCCESS",
  });
});

app.listen(PORT, () => console.log("Listening at 4093"));
