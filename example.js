const sdk = require('./index')

// mobile registration
sdk.mobileRegistration
  .run({ mobileCountry: '+1', mobile: '1234567890' })
  .then(function (data) {
    console.log(data)
  })
  .catch(function (error) {
    console.log(error)
  })

// sdk. mobileVerification.run({referenceId: 'a631374c-c69d-47e0-a00e-2738b2yp3513', mobileOtp: '318326'}).then(function (data){
// console.log(data)
// }).catch(console.log)
