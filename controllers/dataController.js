var mongoose = require("mongoose");
var modelName = require("../model/modelName");

// Fetch only one column 
module.exports.list = function(req, res) {
  modelName.find({}, {Name : 1, Age :2}).exec(function (err, results) {
    if (err) {
      console.log("Error:", err);
    }
    else {
        console.log("results=" , results);
      res.send( JSON.stringify(results));
    }
  });
};
