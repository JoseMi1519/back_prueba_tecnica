const express = require("express");
const app = express();
const router = require("./routers");
const mongoose = require("mongoose")
// const URL = process.env.DB_URL;
// const DATA_BASE_NAME = process.env.DB_NAME;
const PORT = process.env.PORT

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

app.use(express.json());
app.use(router);

// app.get("/", function (req, res) {
//   res.send("Hello World");
// });

