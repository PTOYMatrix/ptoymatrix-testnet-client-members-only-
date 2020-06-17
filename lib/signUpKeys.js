const ServiceBase = require('./base')
const requestPromise = require('request-promise')

const constraints = {
  mnemonic: {
    presence: { allowEmpty: true }
  }
}

module.exports = class SignUpKeys extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const signupKeysAPI = `${this.BASEURL}/api/v1/user/signup-keys`

    const options = {
      rejectUnauthorized: false,
      method: 'POST',
      uri: signupKeysAPI,
      body: {
        seed: this.mnemonic
      },
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
