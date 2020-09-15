const sdk = require('./index')
require('dotenv').config()

const sleep = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

const signUpUser = async () => {
  try {
    const { mnemonic } = await sdk.generateMnemonic.run()

    const { referenceId, otpCode } = await sdk.mobileRegistration.run({
      mobileCountry: '+1',
      mobile: '1234567897'
    })

    const { signupReferenceId } = await sdk.mobileVerification.run({
      referenceId: referenceId,
      mobileOtp: otpCode
    })

    const signUpKeys = await sdk.signUpKeys.run({ mnemonic })

    await sdk.signUp.run(Object.assign({}, { signupReferenceId }, signUpKeys))

    // wait for blockchain to process the transaction before you login
    await sleep(5000)

    const { userProfile } = await sdk.login.run({
      walletAddress: signUpKeys.walletAddress,
      ecdsaSignature: signUpKeys.ecdsaSignature
    })

    return {
      userProfile,
      mnemonic
    }
  } catch (error) {
    return error
  }
}

signUpUser().then(console.info).then(console.error)
