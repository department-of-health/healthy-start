var express = require('express')
var router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here
  // Branching

  // Set the journey type
    router.get('/overview', function (req, res) {
      if (req.query.record == 'existing') {
        req.session.data['record'] = 'existing';
      } else {
        req.session.data['record'] = 'new';
      }

      res.render('overview')
    })

  // Applicant section
    // Only show education page if they are over 16 and under 20
    router.get('/start/applicant/education', function (req, res) {
      function getAge(birth) {
        ageMS = Date.parse(Date()) - Date.parse(birth);
        age = new Date();
        age.setTime(ageMS);
        ageYear = age.getFullYear() - 1970;

        return ageYear;
      }

      var age = getAge(req.session.data['dobMonth'] + '/' + req.session.data['dobDay'] + '/' + req.session.data['dobYear']);

      if (age < 16) {
        res.redirect('/parent-must-apply')
      } else if (age < 20) {
        res.render('start/applicant/education')
      } else {
        res.redirect('/start/parent-guardian/living-with')
      }
    })

  // Parent/guardian section
    // Only load the parent/guardian section if applicant is under 20 and in full time education, else skip to partner
    router.get('/start/parent-guardian/living-with', function (req, res) {
      function getAge(birth) {
        ageMS = Date.parse(Date()) - Date.parse(birth);
        age = new Date();
        age.setTime(ageMS);
        ageYear = age.getFullYear() - 1970;

        return ageYear;
      }

      var age = getAge(req.session.data['dobMonth'] + '/' + req.session.data['dobDay'] + '/' + req.session.data['dobYear']);
      var fullTimeEducation = req.session.data['fullTimeEducation'];

      if (age < 20 && fullTimeEducation == 'true') {
        res.render('start/parent-guardian/living-with')
      } else {
        res.redirect('/start/partner/living-with')
      }
    })

    // Only show the parent/guardian details section if the selected they DO live with a parent/guardian
    router.get('/start/parent-guardian/ni', function (req, res) {
      var livingWithParentGuardian = req.session.data['livingWithParentGuardian'];

      if (livingWithParentGuardian == 'true') {
        res.render('start/parent-guardian/ni')
      } else {
        res.redirect('/start/partner/living-with')
      }
    })

  // Partner section
    // Only show the partner details section if the selected they DO live with their partner
    router.get('/start/partner/ni', function (req, res) {
      var livingWithPartner = req.session.data['livingWithPartner'];
      var record = req.session.data['record'];

      if (livingWithPartner == 'true') {
        res.render('start/partner/ni')
      } else {
        res.redirect('/new-record/applicant/pregnancy')
      }
    })

  // Existing record
    router.get('/existing-record', function (req, res) {
        req.session.data['applicantOnRecord'] = 'false';

      // Applicant details
        req.session.data['dobDay']            = '14';
        req.session.data['dobMonth']          = '02';
        req.session.data['dobYear']           = '1999';
        req.session.data['niNumber']          = 'TR 72 14 06 C';
        req.session.data['claimBenefits']     = 'false';

        req.session.data['buildingStreet1']   = '134 Lawrence Weston Rd';
        req.session.data['buildingStreet2']   = 'Chittening';
        req.session.data['town']              = 'Bristol';
        req.session.data['postCode']          = 'BS11 0ST';

      // Children
        req.session.data['children']          = 'true';
        req.session.data['childOneDobDay']    = '11';
        req.session.data['childOneDobMonth']  = '05';
        req.session.data['childOneDobYear']   = '2009';
        req.session.data['childOneFirstName'] = 'Thomas';
        req.session.data['childOneSurname']   = 'Brown';

        req.session.data['childTwo']          = 'true';
        req.session.data['childTwoDobDay']    = '23';
        req.session.data['childTwoDobMonth']  = '11';
        req.session.data['childTwoDobYear']   = '2013';
        req.session.data['childTwoFirstName'] = 'Ellie';
        req.session.data['childTwoSurname']   = 'Brown';

      // Partner
        req.session.data['livingWithPartner']    = 'true';
        req.session.data['partnerFirstName']     = 'Jack';
        req.session.data['partnerSurname']       = 'Hart';
        req.session.data['partnerPhone']         = '07894 567 123';
        req.session.data['partnerEmail']         = 'jackhart@gmail.com';
        req.session.data['partnerDobDay']        = '27';
        req.session.data['partnerDobMonth']      = '09';
        req.session.data['partnerDobYear']       = '1997';
        req.session.data['partnerNiNumber']      = 'KM 65 69 15 D';
        req.session.data['partnerBenefits']      = 'Universal credit';
        req.session.data['partnerClaimBenefits'] = 'true';

        res.render('existing-record/index.html');
    })

    router.get('/existing-record/additional-details', function (req, res) {
      var securityQuestion = req.session.data['securityQuestion'];

      if (securityQuestion == 'Thomas' || securityQuestion == 'thomas') {
        res.render('existing-record/additional-details/index.html')
      } else {
        res.redirect('/existing-record/security-question-failed')
      }
    })

  // New record
    router.get('/new-record/applicant/pregnancy', function (req, res) {
      var record = req.session.data['record'];

      if (record == 'existing') {
        res.redirect('/existing-record')
      } else {
        res.render('new-record/applicant/pregnancy')
      }
    })

    // Only show the partner details section (starting from relationship) if the selected they DO live with their partner
    router.get('/new-record/partner/name', function (req, res) {
      var livingWithPartner = req.session.data['livingWithPartner'];

      if (livingWithPartner === 'true') {
        res.render('new-record/partner/name')
      } else {
        res.redirect('/new-record/parent-guardian/name')
      }
    })

    // Only show the parent/guardian details section (starting from relationship) if the selected they DO live with their parent/guardian
    router.get('/new-record/parent-guardian/name', function (req, res) {
      var livingWithParentGuardian = req.session.data['livingWithParentGuardian'];

      if (livingWithParentGuardian === 'true') {
        res.render('new-record/parent-guardian/name')
      } else {
        res.redirect('/new-record/contact/phone')
      }
    })
    
    // Check eligibility of applicant before continuing
    router.get('/new-record/contact/phone', function (req, res) {
      // Get age
      function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age--;
        }
        return age;
      }
      var age = getAge(req.session.data['dobMonth'] + '/' + req.session.data['dobDay'] + '/' + req.session.data['dobYear']);

      // Get weeks pregnant
      function weeksPregnant() {
        var month = req.session.data['deliveryDateMonth'];
        var day = req.session.data['deliveryDateDay'];
        var year = req.session.data['deliveryDateYear'];

        function calculateWeeksBetween(currentDate, dueDate) {
          var ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
          var currentDate_ms = currentDate.getTime();
          var dueDate_ms = dueDate.getTime();
          var difference_ms = Math.abs(currentDate_ms - dueDate_ms);
          return Math.floor(difference_ms / ONE_WEEK);
        }

        var currentDate   = new Date();
        var dueDate       = new Date(year, month - 1, day);

        return 40 - calculateWeeksBetween(currentDate, dueDate);
      }
      var weeksPregnant = weeksPregnant();

      // Get children age
      function getChildrenUnderFour() {
        var hasChildrenUnderFour = req.session.data['children'];
        var childOneDob     = req.session.data['childOneDobMonth'] + '/' + req.session.data['childOneDobDay'] + '/' + req.session.data['childOneDobYear'];
        var childTwoDob     = req.session.data['childTwoDobMonth'] + '/' + req.session.data['childTwoDobDay'] + '/' + req.session.data['childTwoDobYear'];
        var childThreeDob   = req.session.data['childThreeDobMonth'] + '/' + req.session.data['childThreeDobDay'] + '/' + req.session.data['childThreeDobYear'];
        var childFourDob    = req.session.data['childFourDobMonth'] + '/' + req.session.data['childFourDobDay'] + '/' + req.session.data['childFourDobYear'];
        var childFiveDob    = req.session.data['childFiveDobMonth'] + '/' + req.session.data['childFiveDobDay'] + '/' + req.session.data['childFiveDobYear'];
        var childSixDob     = req.session.data['childSixDobMonth'] + '/' + req.session.data['childSixDobDay'] + '/' + req.session.data['childSixDobYear'];
        var childSeventhDob = req.session.data['childSeventhDobMonth'] + '/' + req.session.data['childSeventhDobDay'] + '/' + req.session.data['childSeventhDobYear'];
        var childEighthDob  = req.session.data['childEighthDobMonth'] + '/' + req.session.data['childEighthDobDay'] + '/' + req.session.data['childEighthDobYear'];

        var childAges = [childOneDob, childTwoDob, childThreeDob, childFourDob, childFiveDob, childSixDob, childSeventhDob, childEighthDob];

        if (hasChildrenUnderFour == 'false') {
          return false;
        }

        for (var i = 0; i < childAges.length; i++) {
          var childAge = getAge(childAges[i]);

          if (childAge < 4) {
            return true;
          }
        }

        return false;
      }
      var hasChildrenUnderFour = getChildrenUnderFour();

      // Get benefits
      function getEligibleBenefits() {
        var claimBenefits                       = req.session.data['claimBenefits'];
        var partnerClaimBenefits                = req.session.data['partnerClaimBenefits'];
        var parentGuardianClaimBenefits         = req.session.data['parentGuardianClaimBenefits'];
        var parentGuardianPartnerClaimBenefits  = req.session.data['parentGuardianPartnerClaimBenefits'];

        var benefits = [claimBenefits, partnerClaimBenefits, parentGuardianClaimBenefits, parentGuardianPartnerClaimBenefits];

        for (var i = 0; i < benefits.length; i++) {
          var benefit = benefits[i];

          if (benefit == 'true') {
            return true;
          }
        }

        return false;
      }
      var receivesEligibleBenefits = getEligibleBenefits();

      function isEligible() {
        if ((age < 18 && weeksPregnant > 10) || ((hasChildrenUnderFour || weeksPregnant > 10) && receivesEligibleBenefits)) {
          return true;
        } else {
          return false;
        }
      }
      var isEligible = isEligible();

      if (isEligible == true) {
        res.render('new-record/contact/phone')
      } else {
        res.redirect('/eligibility/ineligible')
      }
    })

  // Check answers
  router.get('/application/check-answers', function (req, res) {
      req.session.data['saveableFields']    = 'true';

      res.render('application/check-answers.html');
  })

  // Check eligibility
    router.get('/application/confirmation', function (req, res) {
      // Get age
      function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age--;
        }
        return age;
      }
      var age = getAge(req.session.data['dobMonth'] + '/' + req.session.data['dobDay'] + '/' + req.session.data['dobYear']);

      // Get weeks pregnant
      function weeksPregnant() {
        var month = req.session.data['deliveryDateMonth'];
        var day = req.session.data['deliveryDateDay'];
        var year = req.session.data['deliveryDateYear'];

        function calculateWeeksBetween(currentDate, dueDate) {
          var ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
          var currentDate_ms = currentDate.getTime();
          var dueDate_ms = dueDate.getTime();
          var difference_ms = Math.abs(currentDate_ms - dueDate_ms);
          return Math.floor(difference_ms / ONE_WEEK);
        }

        var currentDate   = new Date();
        var dueDate       = new Date(year, month - 1, day);

        return 40 - calculateWeeksBetween(currentDate, dueDate);
      }
      var weeksPregnant = weeksPregnant();

      // Get children age
      function getChildrenUnderFour() {
        var hasChildrenUnderFour = req.session.data['children'];
        var childOneDob     = req.session.data['childOneDobMonth'] + '/' + req.session.data['childOneDobDay'] + '/' + req.session.data['childOneDobYear'];
        var childTwoDob     = req.session.data['childTwoDobMonth'] + '/' + req.session.data['childTwoDobDay'] + '/' + req.session.data['childTwoDobYear'];
        var childThreeDob   = req.session.data['childThreeDobMonth'] + '/' + req.session.data['childThreeDobDay'] + '/' + req.session.data['childThreeDobYear'];
        var childFourDob    = req.session.data['childFourDobMonth'] + '/' + req.session.data['childFourDobDay'] + '/' + req.session.data['childFourDobYear'];
        var childFiveDob    = req.session.data['childFiveDobMonth'] + '/' + req.session.data['childFiveDobDay'] + '/' + req.session.data['childFiveDobYear'];
        var childSixDob     = req.session.data['childSixDobMonth'] + '/' + req.session.data['childSixDobDay'] + '/' + req.session.data['childSixDobYear'];
        var childSeventhDob = req.session.data['childSeventhDobMonth'] + '/' + req.session.data['childSeventhDobDay'] + '/' + req.session.data['childSeventhDobYear'];
        var childEighthDob  = req.session.data['childEighthDobMonth'] + '/' + req.session.data['childEighthDobDay'] + '/' + req.session.data['childEighthDobYear'];

        var childAges = [childOneDob, childTwoDob, childThreeDob, childFourDob, childFiveDob, childSixDob, childSeventhDob, childEighthDob];

        if (hasChildrenUnderFour == 'false') {
          return false;
        }

        for (var i = 0; i < childAges.length; i++) {
          var childAge = getAge(childAges[i]);

          if (childAge < 4) {
            return true;
          }
        }

        return false;
      }
      var hasChildrenUnderFour = getChildrenUnderFour();

      // Get benefits
      function getEligibleBenefits() {
        var claimBenefits                       = req.session.data['claimBenefits'];
        var partnerClaimBenefits                = req.session.data['partnerClaimBenefits'];
        var parentGuardianClaimBenefits         = req.session.data['parentGuardianClaimBenefits'];
        var parentGuardianPartnerClaimBenefits  = req.session.data['parentGuardianPartnerClaimBenefits'];

        var benefits = [claimBenefits, partnerClaimBenefits, parentGuardianClaimBenefits, parentGuardianPartnerClaimBenefits];

        for (var i = 0; i < benefits.length; i++) {
          var benefit = benefits[i];

          if (benefit == 'true') {
            return true;
          }
        }

        return false;
      }
      var receivesEligibleBenefits = getEligibleBenefits();

      function isEligible() {
        if ((age < 18 && weeksPregnant > 10) || ((hasChildrenUnderFour || weeksPregnant > 10) && receivesEligibleBenefits)) {
          return true;
        } else {
          return false;
        }
      }
      var isEligible = isEligible();

      if (isEligible == true) {
        res.render('application/confirmation.html')
      } else {
        res.redirect('/application/ineligible.html')
      }
    })

// Original journey logic (keeping for reference, removes once new journey is complete)
  // Only show education question if they are the right age
  router.get('/application/section/about/education', function (req, res) {
    function getAge(birth) {
      ageMS = Date.parse(Date()) - Date.parse(birth);
      age = new Date();
      age.setTime(ageMS);
      ageYear = age.getFullYear() - 1970;

      return ageYear;
    }

    var age = getAge(req.session.data['dobMonth'] + '/' + req.session.data['dobDay'] + '/' + req.session.data['dobYear']);

    if (age < 20) {
      res.render('application/section/about/education')
    } else {
      res.redirect('/application/section/about/ni')
    }
  })

  // Only show the partner details section (starting from relationship) if the selected they DO live with their partner
  router.get('/application/section/partner/relationship', function (req, res) {
    var livingWithPartner = req.session.data['livingWithPartner'];

    if (livingWithPartner === 'true') {
      res.render('application/section/partner/relationship')
    } else {
      res.redirect('/application/section/parent-guardian/living-with')
    }
  })

  // Only show the parent/guardian living with question if their the right age/in full time education
  router.get('/application/section/parent-guardian/living-with', function (req, res) {
    function getAge(birth) {
      ageMS = Date.parse(Date()) - Date.parse(birth);
      age = new Date();
      age.setTime(ageMS);
      ageYear = age.getFullYear() - 1970;

      return ageYear;
    }

    var age = getAge(req.session.data['dobMonth'] + '/' + req.session.data['dobDay'] + '/' + req.session.data['dobYear']);
    var inFullTimeEducation = req.session.data['fullTimeEducation'];

    if (age < 18 || age < 20 && inFullTimeEducation === 'true') {
      res.render('application/section/parent-guardian/living-with')
    } else {
      res.redirect('/application/check-answers')
    }
  })

  // Only show the parent/guardian details section (starting from relationship) if the selected they DO live with their parent/guardian
  router.get('/application/section/parent-guardian/relationship', function (req, res) {
    var livingWithParentGuardian = req.session.data['livingWithParentGuardian'];

    if (livingWithParentGuardian === 'true') {
      res.render('application/section/parent-guardian/relationship')
    } else {
      res.redirect('/application/check-answers')
    }
  })

  // Only show the parent/guardian partner details section (starting from relationship) if the selected they DO live with their parent/guardian partner
  router.get('/application/section/parent-guardian-partner/relationship', function (req, res) {
    var livingWithParentGuardianPartner = req.session.data['livingWithParentGuardianPartner'];

    if (livingWithParentGuardianPartner === 'true') {
      res.render('application/section/parent-guardian-partner/relationship')
    } else {
      res.redirect('/application/check-answers')
    }
  })

  // Referral code 
  router.get('/application/referral/valid-code-eligible', function (req, res) {

    if (req.session.data['refCode'] == 'ELJSMV6VkQ') {
    // Valid code & Elgibile
        req.session.data['saveableFields']    = 'true';
        req.session.data['editableFields']    = 'true';

      // Children
        req.session.data['children']          = 'true';
        req.session.data['childOneDobDay']    = '11';
        req.session.data['childOneDobMonth']  = '05';
        req.session.data['childOneDobYear']   = '2009';
        req.session.data['childOneFirstName'] = 'Thomas';
        req.session.data['childOneSurname']   = 'Brown';

        req.session.data['childTwo']          = 'true';
        req.session.data['childTwoDobDay']    = '22';
        req.session.data['childTwoDobMonth']  = '11';
        req.session.data['childTwoDobYear']   = '2013';
        req.session.data['childTwoFirstName'] = 'Ellie';
        req.session.data['childTwoSurname']   = 'Brown';

      // Mother details
        req.session.data['dobDay']          = '14';
        req.session.data['dobMonth']        = '02';
        req.session.data['dobYear']         = '1999';
        req.session.data['niNumber']        = 'TR 72 14 06 C';
        req.session.data['firstName']       = 'Sarah';
        req.session.data['surname']         = 'Brown';

        // Address
        req.session.data['buildingStreet1'] = '134 Lawrence Weston Rd';
        req.session.data['buildingStreet2'] = 'Chittening';
        req.session.data['town']            = 'Bristol';
        req.session.data['postCode']        = 'BS11 0ST';

      res.render('application/referral/valid-code-eligible.html')

    } else if (req.session.data['refCode'] == 'INJCC6S6VQ') {
    // Valid code & Inelgibile
      res.redirect('/application/referral/valid-code-ineligible.html')
    } else if (req.session.data['refCode'] == 'EXJCC6S6VQ') {
    // Valid code & Inelgibile
      res.redirect('/application/referral/valid-code-expired.html')
    } else {
    // Invalid code
      res.redirect('/application/referral/invalid-code.html')
    }
  })

  // Change of details
  router.get('/application/change-details/valid-login', function (req, res) {
      // Set session vars so we can tell if they are changing details or applying
        req.session.data['confirmingDetails'] = 'true';
        req.session.data['saveableFields']    = 'true';
        req.session.data['editableFields']    = 'true';

      // Pregnancy
        req.session.data['pregnant']          = 'true';
        req.session.data['deliveryDateDay']   = '24';
        req.session.data['deliveryDateMonth'] = '02';
        req.session.data['deliveryDateYear']  = '2018';

      // Children
        req.session.data['children']          = 'true';
        req.session.data['childOneDobDay']    = '11';
        req.session.data['childOneDobMonth']  = '05';
        req.session.data['childOneDobYear']   = '2009';
        req.session.data['childOneFirstName'] = 'Thomas';
        req.session.data['childOneSurname']   = 'Brown';

        req.session.data['childTwo']          = 'true';
        req.session.data['childTwoDobDay']    = '23';
        req.session.data['childTwoDobMonth']  = '11';
        req.session.data['childTwoDobYear']   = '2013';
        req.session.data['childTwoFirstName'] = 'Ellie';
        req.session.data['childTwoSurname']   = 'Brown';

      // Applicant details
        req.session.data['dobDay']            = '14';
        req.session.data['dobMonth']          = '02';
        req.session.data['dobYear']           = '1999';
        req.session.data['fullTimeEducation'] = 'true';
        req.session.data['niNumber']          = 'TR 72 14 06 C';
        req.session.data['firstName']         = 'Sarah';
        req.session.data['surname']           = 'Brown';
        req.session.data['claimBenefits']     = 'false';

      // Contact details
        req.session.data['phoneNumber']     = '07485 241 658';
        req.session.data['email']           = 'sarah.brown@gmail.com';
        req.session.data['buildingStreet1'] = '134 Lawrence Weston Rd';
        req.session.data['buildingStreet2'] = 'Chittening';
        req.session.data['town']            = 'Bristol';
        req.session.data['postCode']        = 'BS11 0ST';

      //Partner
        req.session.data['livingWithPartner']    = 'true';
        req.session.data['partnerRelationship']  = 'boyfriend';
        req.session.data['partnerDobDay']        = '27';
        req.session.data['partnerDobMonth']      = '09';
        req.session.data['partnerDobYear']       = '1997';
        req.session.data['partnerNiNumber']      = 'KM 65 69 15 D';
        req.session.data['partnerFirstName']     = 'Jack';
        req.session.data['partnerSurname']       = 'Hart';
        req.session.data['partnerClaimBenefits'] = 'false';

      // Parent/Guardian
        req.session.data['livingWithParentGuardian']    = 'true';
        req.session.data['parentGuardianRelationship']  = 'mother';
        req.session.data['parentGuardianDobDay']        = '25';
        req.session.data['parentGuardianDobMonth']      = '04';
        req.session.data['parentGuardianDobYear']       = '1970';
        req.session.data['parentGuardianNiNumber']      = 'LB 49 24 18 C';
        req.session.data['parentGuardianFirstName']     = 'Jude';
        req.session.data['parentGuardianSurname']       = 'Brown';
        req.session.data['parentGuardianClaimBenefits'] = 'true';
      
      // Parent/Guardian Partner
        req.session.data['livingWithParentGuardianPartner']    = 'true';
        req.session.data['parentGuardianPartnerRelationship']  = 'father';
        req.session.data['parentGuardianPartnerDobDay']        = '21';
        req.session.data['parentGuardianPartnerDobMonth']      = '11';
        req.session.data['parentGuardianPartnerDobYear']       = '1967';
        req.session.data['parentGuardianPartnerNiNumber']      = 'MK 32 35 61 A';
        req.session.data['parentGuardianPartnerFirstName']     = 'Nick';
        req.session.data['parentGuardianPartnerSurname']       = 'Brown';
        req.session.data['parentGuardianPartnerClaimBenefits'] = 'false';

      res.redirect('/application/check-answers.html');
  })

module.exports = router
