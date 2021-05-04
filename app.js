const express = require('express');
const path = require('path');
const jiraRoute = require('./routes/jiraRoutes');
const encryptionRoute = require('./routes/encryptionRoute.js');
const dataRoute = require('./routes/dataRoute.js');
const app = express();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/mydb')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.use('/', jiraRoute);              //handle route '/' + PATH
app.use('/v1', jiraRoute);            //handle route /v1/PATH'
app.use('/', encryptionRoute);        //handle route '/' + PATH
app.use('/', dataRoute);            //handle route '/' + PATH

// order of app.use is important
app.use((req, res, next) => {
    const error = new Error("Wrong route Path");
    error.status = 404;
    next(error);
});
  
// error handler middleware
app.use((error, req, res, next) => {
      res.status(error.status || 500).send({
        error: {
          status: error.status || 500,
          message: error.message || 'Internal Server Error',
        },
      });
});

app.listen(8000);

mongoose.connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});