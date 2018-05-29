const ServiceBase = require('./base')
const requestPromise = require('request-promise')

const constraints = {
  walletAddress: {
    presence: { allowEmpty: false }
  },
  ecdsaSignture: {
    presence: { allowEmpty: false }
  }
}

module.exports = class Login extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    let loginAPI = `${this.BASEURL}/api/v1/login`

    const options = {
      method: 'POST',
      uri: loginAPI,
      body: {
        walletAddress: this.walletAddress,
        ecdsaSignture: this.ecdsaSignture
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
