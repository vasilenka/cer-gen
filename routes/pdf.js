const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const data = require('./../participants/participants')

router.get('/:email', async (req, res, next) => {
  let email = req.params.email.trim()

  let filteredUser = data.filter(user => user.email === email)
  if(filteredUser.length === 0) {
    return res.status(404).send({message: 'No user found!'})
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`http://localhost:3000/generate-pdf?name=${filteredUser[0].name}`, {waitUntil: 'networkidle0'});
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