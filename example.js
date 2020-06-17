const sdk = require('./index')
require('dotenv').config()

// mobile registration
sdk.mobileRegistration
  .run({ mobileCountry: '+1', mobile: '1234567890' })
  .then(function (data) {
    console.log(data)
  })
  .catch(function (error) {
    console.log(error)
  })

// login to platform
const login = async function login () {
  const keys = await sdk.signUpKeys.run({
    mnemonic:
      'degree any diesel ski lens brass sleep put twin diamond meadow close'
  })
  console.log(keys)
  const { ecdsaSignature, walletAddress } = keys
  const loginResponse = await sdk.login.run({ ecdsaSignature, walletAddress })

  return loginResponse
}

login()
  .then(function (data) {
    console.log(data)
  })
  .catch(function (error) {
    console.log(error)
  })

// sdk. mobileVerification.run({referenceId: 'a631374c-c69d-47e0-a00e-2738b2yp3513', mobileOtp: '318326'}).then(function (data){
// console.log(data)
// }).catch(console.log)
