// Create app after loading express module

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded(endoded({ extended: true })));

module.exports = app;
