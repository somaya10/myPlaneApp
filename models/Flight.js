var express = require('express');
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FlightSchema   = new Schema({
    flightnumber: String,
    start : String,
    end: String,
    date : {
      type: String,
      default: Date.now
    },
    aircraft : String
});

module.exports = Flight =mongoose.model('Flight', FlightSchema);
