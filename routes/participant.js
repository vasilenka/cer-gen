var express = require('express');
var router = express.Router();
const GoogleSpreadsheet = require('google-spreadsheet')
const creds = require('./../keys/client_secret.json')
const fs = require('fs')

router.get('/', function(req, res, next) {

  const doc = new GoogleSpreadsheet('1ZLhlLgW2YFZlboz8X3zofqAFfLUIIvchbXebIeY-Ot0')

  doc.useServiceAccountAuth(creds, (err) =>
    doc.getRows(1, (err, rows) => {
      let data = rows.map(row => ({
        no: row.no,
        id: row.id,
        name: row.name,
        email: row.email
      }))
      fs.writeFileSync('./participant.js', `module.exports = ${JSON.stringify(data)}`, (err) => {
        if(!err) {
          return res.status(200).json({success: 'berhasil'})
        }
        return res.status(500).json({error: 'gagal'})
      })
    })
  )

});

module.exports = router;
