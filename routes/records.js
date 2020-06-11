var express = require('express');
var router = express.Router();
const cors = require('./cors');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./public/db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ records: [], totalGames: 0, winners: 0 })
  .write()


/* GET users listing. */
router.route('/')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, function(req, res, next) {
  const response = {
    records: db.get('records').orderBy('time', 'desc').value(),
    totalGames: db.get('totalGames').value(),
    winners: db.get('winners').value()
  }
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json(response);
})
.post(cors.cors, (req, res, next) => {
  const games = db.update('totalGames', n => n + 1)
  .write()
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json(games);
})

router.post('/winner', (req, res, next) => {
  var winners = parseInt(db.get('winners').value());
  db.update('winners', n => winners + 1)
  .write()
  const player = db.get('records')
    .push({ time: winners + 1, name: req.body.name})
    .write()
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json(player);
});

module.exports = router;
