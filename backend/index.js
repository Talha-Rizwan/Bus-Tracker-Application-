const express = require("express")
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');

const mongo = require('mongodb');

const routeRoute = require('./routes/route.route')
const vehicleRoute = require('./routes/vehicle.route')
const directionRoute = require('./routes/direction.route')
const stopRoute = require('./routes/stops.route')
const patternRoute = require('./routes/pattern.route')

mongoose
    .connect('mongodb://127.0.0.1:27017/mydatabase')
    .then((x) => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch((err) => {
        console.error('Error connecting to mongo', err.reason)
    })
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/route', routeRoute)
app.use('/vehicle', vehicleRoute)
app.use('/direction', directionRoute)
app.use('/stop', stopRoute)
app.use('/pattern', patternRoute)

// PORT
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})
// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});