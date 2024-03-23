var express = require("express");
const app = express();
app.use(express.json());
const Persons = require("./models/Person");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const connectDB = require("./db");
const Person = require("./models/Person");
const MenuItem = require("./models/MenuItem");

const PORT = 5000;

//middleware function to console log request
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`
  );
  next();
};
app.use(logRequest);

//Import the router files
const personRoutes = require("./router/personRoutes");
const menuItemRoutes = require("./router/menuItemRoutes");
const studentDetailsRoutes = require("./router/studentDetailsRoutes");

//use the router
app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);
app.use("/student", studentDetailsRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
  });
});
