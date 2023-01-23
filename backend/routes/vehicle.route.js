const https = require('https');
let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();
// Vehicle Model
let vehicleSchema = require('../models/Vehicle');
// CREATE Vehicle
router.route('/create-vehicle').post((req, res, next) => {
    vehicleSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});
router.route('/getVehicles').get((req, res) => {
    const url = `https://ctabustracker.com/bustime/api/v2/getvehicles?key=ujAhaYu9dy6TAF2VgMLWK5nnV&rt=20&format=json`
    https.get(url, res => {
        let body = ""
        res.on('data', chunk => {
            body += chunk
        });
        res.on('end', () => {
            try {
                let json = JSON.parse(body);
                let arr = json["bustime-response"]["vehicle"]
                for (let i = 0; i < arr.length; i++) {
                    vehicleSchema.create(arr[i], (error, data) => {
                        if (error) {
                            return next(error)
                        } else {
                            console.log(data)
                        }
                    })
                }
            } catch (error) {
                console.error(error.message);
            };
        });
    }).on('error', err => {
        console.log('Error: ', err.message);
    });

    res.send("done")

})

// READ Vehicles
router.route('/').get((req, res) => {

    vehicleSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})
// Get Single Vehicle
router.route('/edit-vehicle/:id').get((req, res) => {
    vehicleSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Update Vehicle
router.route('/update-vehicle/:id').put((req, res, next) => {
    vehicleSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Vehicle updated successfully !')
        }
    })
})
// Delete Vehicle
router.route('/delete-vehicle/:id').delete((req, res, next) => {
    vehicleSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})
module.exports = router;