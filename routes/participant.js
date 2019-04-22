var express = require('express');
var router = express.Router();
const GoogleSpreadsheet = require('google-spreadsheet')
const creds = require('./../keys/client_secret.json')
const fs = require('fs')
const participant = require('./../participants/participants')

router.get('/', function(req, res, next) {

  const doc = new GoogleSpreadsheet('1ZLhlLgW2YFZlboz8X3zofqAFfLUIIvchbXebIeY-Ot0')

  doc.useServiceAccountAuth(creds, (err) =>
    doc.getRows(1, (err, rows) => {
      let data = rows.map(row => ({
        no: row.no,
        name: row.name,
        email: row.email
      }))
      fs.writeFileSync('./participants/participants.js', `module.exports = ${JSON.stringify(data)}`)
    })
  )

});

router.get('/all', function(req, res, next) {
  res.status(200).json(participant)
});

module.exports = router;
