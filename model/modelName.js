var mongoose = require('mongoose');

var schemaName  = new mongoose.Schema({
  NAME: String
});

module.exports = mongoose.model('modelName', schemaName, 'collection1');