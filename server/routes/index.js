var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/pdf', async (req, res, next) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', {waitUntil: 'networkidle0'});
  const pdf = await page.pdf({
    format: 'A3',
    landscape: true,
    printBackground: true,
  });

  await browser.close();
  // return pdf
  res.send(pdf)
})


module.exports = router;
