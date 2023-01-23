const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let stopSchema = new Schema({
    stpid: {
        type: String
    },
    stpnm: {
        type: String
    },
    lat: {
        type: Number
    },
    lon: {
        type: Number
    }
}, {
    collection: 'stops'
})
module.exports = mongoose.model('Stop', stopSchema)