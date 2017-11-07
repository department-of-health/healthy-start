var express = require('express')
var router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here

// Branching
    // Check eligibility form
    router.get('/check-eligibility/question/over-18', function (req, res) {
      var pregnant-or-children = req.query.pregnant-or-children

      if (pregnant-or-children === 'false') {
        res.redirect('/check-eligibility/not-eligible')
      } else {
        res.render('check-eligibility/question/over-18')
      }
    })

    router.get('/check-eligibility/question/receiving-qualifying-benefits', function (req, res) {
      var over-18 = req.query.over-18

      if (over-18 === 'false') {
        res.redirect('/check-eligibility/not-eligible')
      } else {
        res.render('check-eligibility/question/receiving-qualifying-benefits')
      }
    })

    router.get('/check-eligibility/eligibile', function (req, res) {
      var receives-benefit = req.query.receives-benefit

      if (receives-benefit === 'false') {
        res.redirect('/check-eligibility/not-eligible')
      } else {
        res.render('check-eligibility/eligibile')
      }
    })

module.exports = router
