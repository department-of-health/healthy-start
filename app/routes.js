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
	  var pregnantOrChildren = req.query.pregnantOrChildren

	  if (pregnantOrChildren === 'false') {
	    res.redirect('/check-eligibility/not-eligible')
	  } else {
	    res.render('check-eligibility/question/over-18')
	  }
	})

	router.get('/check-eligibility/question/receiving-qualifying-benefits', function (req, res) {
	  var over18 = req.query.over18

	  if (over18 === 'false') {
	    res.redirect('/check-eligibility/not-eligible')
	  } else {
	    res.render('check-eligibility/question/receiving-qualifying-benefits')
	  }
	})

	router.get('/application', function (req, res) {
		var qualifyingBenefits = [];
	  var incomeSupport = req.query.incomeSupport
	  var incomeRelatedEmploymentAndSupportAllowance = req.query.incomeRelatedEmploymentAndSupportAllowance
	  var incomeBasesJobseekersAllowance = req.query.incomeBasesJobseekersAllowance
	  var childTaxCredit = req.query.childTaxCredit
	  var universalCredit = req.query.universalCredit

	  if (over18 === 'false') {
	    res.redirect('/check-eligibility/not-eligible')
	  } else {
	    res.render('check-eligibility/question/receiving-qualifying-benefits')
	  }
	})

module.exports = router
