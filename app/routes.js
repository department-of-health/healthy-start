var express = require('express')
var router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here
  // Branching

  // Only show edutcation question if they are the right age
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

    if (age < 18 || age < 20 && (inFullTimeEducation === 'true')) {
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
      res.redirect('/application/section/claim-to-benefits')
    }
  })

  // Only show the parent/guardian partner details section (starting from relationship) if the selected they DO live with their parent/guardian partner
  router.get('/application/section/parent-guardian-partner/relationship', function (req, res) {
    var livingWithParentGuardianPartner = req.session.data['livingWithParentGuardianPartner'];

    if (livingWithParentGuardianPartner === 'true') {
      res.render('application/section/parent-guardian-partner/relationship')
    } else {
      res.redirect('/application/section/claim-to-benefits')
    }
  })

  // Only show the claim to benefits question if they selected yes on either of the questions about weather they're included in a claim for benefits
  router.get('/application/section/claim-to-benefits', function (req, res) {
    var parentGuardianClaimBenefits = req.session.data['parentGuardianClaimBenefits'];
    var parentGuardianPartnerClaimBenefits = req.session.data['parentGuardianPartnerClaimBenefits'];

    if (parentGuardianClaimBenefits === 'true' || parentGuardianPartnerClaimBenefits === 'true') {
      res.render('application/section/claim-to-benefits/index.html')
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
        req.session.data['dobDay']                                        = '14';
        req.session.data['dobMonth']                                      = '02';
        req.session.data['dobYear']                                       = '1999';
        req.session.data['fullTimeEducation']                             = 'true';
        req.session.data['niNumber']                                      = 'TR 72 14 06 C';
        req.session.data['firstName']                                     = 'Sarah';
        req.session.data['surname']                                       = 'Brown';
        req.session.data['incomeRelatedEmploymentAndSupportAllowance']    = 'true';
        req.session.data['incomeBasedJobseekersAllowance']                = 'true';

      // Contact details
        req.session.data['phoneNumber']     = '07485 241 658';
        req.session.data['email']           = 'sarah.brown@gmail.com';
        req.session.data['buildingStreet1'] = '134 Lawrence Weston Rd';
        req.session.data['buildingStreet2'] = 'Chittening';
        req.session.data['town']            = 'Bristol';
        req.session.data['postCode']        = 'BS11 0ST';

      //Partner
        req.session.data['livingWithPartner']                                   = 'true';
        req.session.data['partnerRelationship']                                 = 'boyfriend';
        req.session.data['partnerDobDay']                                       = '27';
        req.session.data['partnerDobMonth']                                     = '09';
        req.session.data['partnerDobYear']                                      = '1997';
        req.session.data['partnerNiNumber']                                     = 'KM 65 69 15 D';
        req.session.data['partnerFirstName']                                    = 'Jack';
        req.session.data['partnerSurname']                                      = 'Hart';
        req.session.data['partnerIncomeRelatedEmploymentAndSupportAllowance']   = 'true';
        req.session.data['partnerIncomeBasedJobseekersAllowance']               = 'true';
        req.session.data['partnerUniversalCredit']                              = 'true';
      
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
        req.session.data['parentGuardianPartnerClaimBenefits'] = 'False';
      
      // Benefit claims
        req.session.data['parentGuardianBenfitFromIncomeBasedJobseekersAllowance']  = 'true';
        req.session.data['parentGuardianBenfitFromUniversalCredit']                 = 'true';

      res.redirect('/application/check-answers.html');
  })

  // Eligibility Check
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
      var incomeRelatedEmploymentAndSupportAllowance  = req.session.data['incomeRelatedEmploymentAndSupportAllowance'];
      var incomeSupport                               = req.session.data['incomeSupport'];
      var incomeBasedJobseekersAllowance              = req.session.data['incomeBasedJobseekersAllowance'];
      var childTaxCredit                              = req.session.data['childTaxCredit'];
      var universalCredit                             = req.session.data['universalCredit'];

      var partnerIncomeRelatedEmploymentAndSupportAllowance  = req.session.data['partnerIncomeRelatedEmploymentAndSupportAllowance'];
      var partnerIncomeSupport                               = req.session.data['partnerIncomeSupport'];
      var partnerIncomeBasedJobseekersAllowance              = req.session.data['partnerIncomeBasedJobseekersAllowance'];
      var partnerChildTaxCredit                              = req.session.data['partnerChildTaxCredit'];
      var partnerUniversalCredit                             = req.session.data['partnerUniversalCredit'];

      var parentGuardianIncomeRelatedEmploymentAndSupportAllowance  = req.session.data['parentGuardianIncomeRelatedEmploymentAndSupportAllowance'];
      var parentGuardianIncomeSupport                               = req.session.data['parentGuardianIncomeSupport'];
      var parentGuardianIncomeBasedJobseekersAllowance              = req.session.data['parentGuardianIncomeBasedJobseekersAllowance'];
      var parentGuardianChildTaxCredit                              = req.session.data['parentGuardianChildTaxCredit'];
      var parentGuardianUniversalCredit                             = req.session.data['parentGuardianUniversalCredit'];

      var parentGuardianPartnerIncomeRelatedEmploymentAndSupportAllowance  = req.session.data['parentGuardianPartnerIncomeRelatedEmploymentAndSupportAllowance'];
      var parentGuardianPartnerIncomeSupport                               = req.session.data['parentGuardianPartnerIncomeSupport'];
      var parentGuardianPartnerIncomeBasedJobseekersAllowance              = req.session.data['parentGuardianPartnerIncomeBasedJobseekersAllowance'];
      var parentGuardianPartnerChildTaxCredit                              = req.session.data['parentGuardianPartnerChildTaxCredit'];
      var parentGuardianPartnerUniversalCredit                             = req.session.data['parentGuardianPartnerUniversalCredit'];

      var benefits = [incomeRelatedEmploymentAndSupportAllowance, incomeSupport, incomeBasedJobseekersAllowance, childTaxCredit, universalCredit, partnerIncomeRelatedEmploymentAndSupportAllowance, partnerIncomeSupport, partnerIncomeBasedJobseekersAllowance, partnerChildTaxCredit, partnerUniversalCredit, parentGuardianIncomeRelatedEmploymentAndSupportAllowance, parentGuardianIncomeSupport, parentGuardianIncomeBasedJobseekersAllowance, parentGuardianChildTaxCredit, parentGuardianUniversalCredit, parentGuardianPartnerIncomeRelatedEmploymentAndSupportAllowance, parentGuardianPartnerIncomeSupport, parentGuardianPartnerIncomeBasedJobseekersAllowance, parentGuardianPartnerChildTaxCredit, parentGuardianPartnerUniversalCredit];

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

module.exports = router
