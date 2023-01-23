const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let routeSchema = new Schema({
  rt: {
    type: String
  },
  rtnm: {
    type: String
  },
  rtclr: {
    type: String
  },
  rtdd: {
    type: String
  }
}, {
    collection: 'routes'
  })
module.exports = mongoose.model('Route', routeSchema)