var express = require('express')
var router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here
  // Branching
  router.get('/application/section/about/education', function (req, res) {
    function getAge(birth) {
      ageMS = Date.parse(Date()) - Date.parse(birth);
      age = new Date();
      age.setTime(ageMS);
      ageYear = age.getFullYear() - 1970;

      return ageYear;
    }

    var age = getAge(req.session.data['dobDay'] + '/' + req.session.data['dobMonth'] + '/' + req.session.data['dobYear']);

    if (age < 20) {
      res.render('application/section/about/education')
    } else {
      res.redirect('/application/section/about/ni')
    }
  })

  router.get('/application/section/partner/relationship', function (req, res) {
    var livingWithPartner = req.session.data['livingWithPartner'];

    if (livingWithPartner === 'true') {
      res.render('application/section/partner/relationship')
    } else {
      res.redirect('/application/section/parent-guardian/living-with')
    }
  })

  router.get('/application/section/parent-guardian/living-with', function (req, res) {
    function getAge(birth) {
      ageMS = Date.parse(Date()) - Date.parse(birth);
      age = new Date();
      age.setTime(ageMS);
      ageYear = age.getFullYear() - 1970;

      return ageYear;
    }

    var age = getAge(req.session.data['dobDay'] + '/' + req.session.data['dobMonth'] + '/' + req.session.data['dobYear']);
    var inFullTimeEducation = req.session.data['fullTimeEducation'];

    if (age < 18 || age < 20 && (inFullTimeEducation === 'true')) {
      res.render('application/section/parent-guardian/living-with')
    } else {
      res.redirect('/application/section/pregnant')
    }
  })

  router.get('/application/section/parent-guardian/relationship', function (req, res) {
    var livingWithParentGuardian = req.session.data['livingWithParentGuardian'];

    if (livingWithParentGuardian === 'true') {
      res.render('application/section/parent-guardian/relationship')
    } else {
      res.redirect('/application/section/pregnant')
    }
  })

  router.get('/application/section/parent-guardian-partner/relationship', function (req, res) {
    var livingWithParentGuardianPartner = req.session.data['livingWithParentGuardianPartner'];

    if (livingWithParentGuardianPartner === 'true') {
      res.render('application/section/parent-guardian-partner/relationship')
    } else {
      res.redirect('/application/section/pregnant')
    }
  })

  router.get('/application/section/claim-to-benefits', function (req, res) {
    var parentGuardianClaimBenefits = req.session.data['parentGuardianClaimBenefits'];
    var parentGuardianPartnerClaimBenefits = req.session.data['parentGuardianPartnerClaimBenefits'];

    if (parentGuardianClaimBenefits === 'true' || parentGuardianPartnerClaimBenefits === 'true') {
      res.render('application/section/claim-to-benefits/index.html')
    } else {
      res.redirect('/application/section/pregnant')
    }
  })

module.exports = router
