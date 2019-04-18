var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({hello: 'world!'});
});

router.get('/pdf/:name', async (req, res, next) => {
  let name = req.params.name
  console.log("NAME: ", name)
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`http://localhost:3000/generate-pdf?name=${name}`, {waitUntil: 'networkidle0'});
  const pdf = await page.pdf({
    // path: `./ce4_${name.replace(' ', '_').toLowerCase()}.pdf`,
    format: 'A4',
    landscape: true,
    printBackground: true,
  });

  // return pdf
  res.type('application/pdf')
  res.send(pdf)

  await browser.close();
})


module.exports = router;
