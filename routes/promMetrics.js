var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.set('Content-Type', Prometheus.register.contentType)
  res.end(Prometheus.register.metrics())
});

module.exports = router;
