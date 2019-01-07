
var express = require('express');
var router = express.Router();
var aircraftType = require('./flightType');
const Flight = require('../models/Flight');


/* GET all Flights */
router.get('/', function(req, res, next) {
  Flight.find(function(err, flights){
    if (err)
      res.send(err);
    res.json(flights);
  });
});


/* GET Flights */
router.get('/:flight_id', function(req, res, next) {
  Flight.find({flightnumber:req.params.flight_id}, function(err, flight){
    if (err)
      res.status(404).json({message:'Flight not found'});
    res.json(flight);
  });
});


/* Post Flights. */
router.post('/', function(req, res, next) {

  if ((aircraftType.some(arr => arr.name === req.body.aircraft)) && (Date.parse(req.body.date))) {

    var flightID = ((req.body.start.substring(0, 1)).toUpperCase() + (req.body.end.substring(0, 1)).toUpperCase() + (Math.floor(Math.random()*(9999-1000+1)+1000)));

    var newFlight = new Flight({      // create a new instance of the Flight model
    flightnumber: flightID,
    start: req.body.start,
    end: req.body.end,
    date: req.body.date,
    aircraft: req.body.aircraft
    });

      newFlight.save(function(err) {
         if (err)
             res.send(err);
         res.json({ message: 'Location: /v1/flights/'+flightID});
      });
  }
  else {
    res.status(404).json({message:'Invalid Date Format or Incorrect AircraftType. Please use ISO format for date and choose from the following aircrafts [DHC-8-400, Boeing B737, Airbus A340]'});
  }
});


/* Delete Flights. */
router.delete('/:flight_id', function(req, res, next) {
  Flight.remove({flightnumber:req.params.flight_id}, function(err, flight){
    if (err)
      res.status(404).json({message:'Flight not found'});
    res.json({ message: 'Successfully deleted'});
  });
});

module.exports = router;
