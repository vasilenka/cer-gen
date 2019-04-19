const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const data = require('./../participant')

router.get('/:name', async (req, res, next) => {
  let name = req.params.name.trim()

  let filteredUser = data.filter(user => user.name === name)
  if(filteredUser.length === 0) {
    return res.status(404).send({message: 'No user found!'})
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`http://localhost:3000/generate-pdf?name=${name}`, {waitUntil: 'networkidle0'});
  const pdf = await page.pdf({
    format: 'A4',
    landscape: true,
    printBackground: true,
  });

  res.type('application/pdf')
  res.status(200).send(pdf)

  await browser.close();

})

module.exports = router