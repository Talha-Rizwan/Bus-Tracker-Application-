const https = require('https');
const { init } = require('../models/Pattern');
let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();
// Pattern Model
let patternSchema = require('../models/Pattern');
// CREATE Pattern
router.route('/create-pattern').post((req, res, next) => {
    patternSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});
router.route('/getPatterns').get((req, res,next) => {
    const url = `https://ctabustracker.com/bustime/api/v2/getpatterns?key=ujAhaYu9dy6TAF2VgMLWK5nnV&rt=20&pid=954&format=json`
    https.get(url, res1 => {
        let body = ""
        res1.on('data', chunk => {
            body += chunk
        });
        res1.on('end', () => {
            try {
                let json = JSON.parse(body);
                let arr = json["bustime-response"]["ptr"]
                let i=0
                for (i = 0; i < arr.length; i++) {
                    patternSchema.create(arr[i], (error, data) => {
                        if (error) {
                            return next(error)
                        } else {
                            console.log(arr[i])
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

// READ Patterns
router.route('/').get((req, res) => {

    patternSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})
// Get Single Pattern
router.route('/edit-pattern/:id').get((req, res) => {
    patternSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Update Pattern
router.route('/update-pattern/:id').put((req, res, next) => {
    patternSchema.findByIdAndUpdate(req.params.id, {
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
router.route('/delete-pattern/:id').delete((req, res, next) => {
    patternSchema.findByIdAndRemove(req.params.id, (error, data) => {
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