var express = require('express');
var router = express.Router();
const cors = require('./cors');

/* GET home page. */
router.route('/:number')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) => {
  var n = req.params.number;
  var answer;
  console.log(n);
  if(n == '0' || n == '4' || n == '8' || n == '12' || n == '16') {
    answer = parseInt(n) + Math.floor(Math.random() * 3) + 1;
  }
  else if(n == '1' || n == '2' || n == '3') { answer = 4; }
  else if(n == '5' || n == '6' || n == '7') { answer = 8; }
  else if(n == '9' || n == '10' || n == '11') { answer = 12; }
  else if(n == '13' || n == '14' || n == '15') { answer = 16; }
  else if(n == '17' || n == '18' || n == '19') { answer = 20; }
  else { answer = 21; }
  
  var responseData = {
    "number": answer
  };
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json(responseData);
});

module.exports = router;
