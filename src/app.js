const express = require("express");
const app = express();
const { db } = require("../db/connection");
const musicianRouter = require("./routes/musician.js");
const bandRouter = require("./routes/bands.js");

const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

app.use("/musician", musicianRouter);
app.use("/band", bandRouter);

module.exports = app;