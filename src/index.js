const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const morgan = require("morgan");

app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// ! middleware
app.use(morgan("tiny"));

// !Routes
app.use(require("./routes/index.routes"));

//! Static Files
app.use(express.static(path.join(__dirname, "/public")));

app.listen(app.get("port"), () => {
  console.log(`app en el puerto ${app.get("port")}`);
});
