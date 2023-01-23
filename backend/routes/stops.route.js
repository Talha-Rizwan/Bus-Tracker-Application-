const https = require('https');
let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();
// Stop Model
let stopSchema = require('../models/Stop');
// CREATE Stop
router.route('/create-stop').post((req, res, next) => {
    stopSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});
router.route('/getStops').get((req, res) => {
    const url = `https://ctabustracker.com/bustime/api/v2/getstops?key=ujAhaYu9dy6TAF2VgMLWK5nnV&rt=7&dir=Eastbound&format=json`
    https.get(url, res => {
        let body = ""
        res.on('data', chunk => {
            body += chunk
        });
        res.on('end', () => {
            try {
                let json = JSON.parse(body);
                let arr = json["bustime-response"]["stops"]
                for (let i = 0; i < arr.length; i++) {
                    stopSchema.create(arr[i], (error, data) => {
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

// READ Stops
router.route('/').get((req, res) => {

    stopSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})
// Get Single Stop
router.route('/edit-stop/:id').get((req, res) => {
    stopSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Update Vehicle
router.route('/update-stop/:id').put((req, res, next) => {
    stopSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Stop updated successfully !')
        }
    })
})
// Delete Vehicle
router.route('/delete-stop/:id').delete((req, res, next) => {
    stopSchema.findByIdAndRemove(req.params.id, (error, data) => {
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