const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const routes = require("./routes/workoutRoute.js");

const PORT = process.env.PORT || 3030;


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(express.static("public"));
app.use(routes);

app.use(logger("dev"));
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });
app.listen(PORT, () => {
    console.log(`app is listening on ${PORT}`)
}) 