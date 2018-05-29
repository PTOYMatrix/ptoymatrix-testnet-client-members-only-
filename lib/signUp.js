const ServiceBase = require('./base')
const requestPromise = require('request-promise')

const constraints = {
  ecdsaPubKey: {
    presence: { allowEmpty: false }
  },
  rsaPubKey: {
    presence: { allowEmpty: false }
  },
  ecdsaEncPrivKey: {
    presence: { allowEmpty: false }
  },
  rsaEncPrivKey: {
    presence: { allowEmpty: false }
  },
  walletAddress: {
    presence: { allowEmpty: false }
  },
  signupReferenceId: {
    presence: { allowEmpty: false },
    format: {
      pattern: '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}',
      message: 'not a valid uuid'
    }
  },
  rsaSignature: {
    presence: { allowEmpty: false }
  },
  ecdsaSignature: {
    presence: { allowEmpty: false }
  },
  dashAddress: {
    presence: { allowEmpty: false }
  }
}

module.exports = class SignUp extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    let signupAPI = `${this.BASEURL}/api/v1/user/signup`

    const options = {
      method: 'POST',
      uri: signupAPI,
      body: this.signUpData,
      json: true // Automatically stringifies the body to JSON
    }

    try {
      const apiResult = await requestPromise(options)
      return apiResult.result
    } catch (error) {
      throw error.error
    }
  }
}
