const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let vehicleSchema = new Schema({
    vid: {
        type: String
    },
    tmstmp: {
        type: String
    },
    lat: {
        type: String
    },
    lon: {
        type: String
    },
    hdg: {
        type: String
    },
    pid: {
        type: Number
    },
    rt:{
        type:String
    },
    des:{
        type:String
    },
    pdist:{
        type:Number
    },
    dly:{
        type:Boolean
    },
    tatripid:{
        type:String
    },
    origtatripno:{
        type:String
    },
    tablockid:{
        type:String
    },
    zone: {
        type:String
    }

}, {
    collection: 'vehicle'
})
module.exports = mongoose.model('Vehicle', vehicleSchema)