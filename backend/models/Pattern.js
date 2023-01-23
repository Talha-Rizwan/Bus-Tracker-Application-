const { Double } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let PT = new Schema({
    seq: {
        type: Number
    },
    lat: {
        type: Number
    },
    lon: {
        type: Number
    },
    typ: {
        type: String
    },
    stpid: {
        type: String
    },
    stpnm: {
        type: String
    },
    pdist: {
        type: Number
    }
});
let patternSchema = new Schema({
    pid: {
        type: Number
    },
    ln: {
        type: Number
    },
    rtdir: {
        type: String
    },
    pt: {
        type: [PT]
    }


}, {
    collection: 'pattern'
})
module.exports = mongoose.model('Pattern', patternSchema)