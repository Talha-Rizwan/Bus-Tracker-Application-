const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let directionSchema = new Schema({
  dir: {
    type: String
  }
}, {
    collection: 'direction'
  })
module.exports = mongoose.model('Direction', directionSchema)


