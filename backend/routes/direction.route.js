const http = require('http');
let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();
// Direction Model
let directionSchema = require('../models/Direction');
// CREATE Direction
router.route('/create-direction').post((req, res, next) => {
    directionSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});
router.route('/getDirections').get((req, res, next) => {
    const url = `http://ctabustracker.com/bustime/api/v2/getdirections?key=ujAhaYu9dy6TAF2VgMLWK5nnV&rt=20&format=json`
    http.get(url, res1 => {
        let body = ""
        res1.on('data', chunk => {
            body += chunk
        });
        res1.on('end', () => {
            try {
                let json = JSON.parse(body);
                let arr = json["bustime-response"]["directions"]
                for (let i = 0; i < arr.length; i++) {
                    directionSchema.create(arr[i], (error, data) => {
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

// READ Directions
router.route('/').get((req, res) => {

    directionSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})
// Get Single Direction
router.route('/edit-direction/:id').get((req, res) => {
    directionSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Update Vehicle
router.route('/update-direction/:id').put((req, res, next) => {
    directionSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Direction updated successfully !')
        }
    })
})
// Delete Vehicle
router.route('/delete-direction/:id').delete((req, res, next) => {
    directionSchema.findByIdAndRemove(req.params.id, (error, data) => {
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
