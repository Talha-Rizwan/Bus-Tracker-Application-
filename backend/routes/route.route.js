const http = require('http');
let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();
// Student Model
let routeSchema = require('../models/Routes');
// CREATE Route
router.route('/create-route').post((req, res, next) => {
    routeSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

// READ Route
router.route('/getRoutes').get((req, res) => {
    const url = `http://ctabustracker.com/bustime/api/v2/getroutes?key=ujAhaYu9dy6TAF2VgMLWK5nnV&format=json`
    console.log('here') 
    http.get(url, res => {
        let body = ""
        res.on('data', chunk => {
            body += chunk
        });
        res.on('end', () => {
            try {
                let json = JSON.parse(body);
                let arr = json["bustime-response"]["routes"]
                for (let i = 0; i < arr.length; i++) {
                    routeSchema.create(arr[i], (error, data) => {
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
    res.send('done')
})

// READ Route
router.route('/').get((req, res) => {
    routeSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})
// Get Single Route
router.route('/edit-route/:id').get((req, res) => {
    routeSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Update Route
router.route('/update-route/:id').put((req, res, next) => {
    routeSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Route updated successfully !')
        }
    })
})
// Delete Route
router.route('/delete-route/:id').delete((req, res, next) => {
    routeSchema.findByIdAndRemove(req.params.id, (error, data) => {
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
