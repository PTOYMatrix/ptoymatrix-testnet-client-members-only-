const validate = require('./customValidator')
const _ = require('lodash')

module.exports = class ServiceBase {
  constructor () {
    this.BASEURL = 'https://testnet.ptoy.org'
    this._args = arguments[0]
    this._errors = {}
    this._successful = null
    this._failed = null
    this._result = null
    this.validateServiceInputs()
    this._filteredArgs = this.filterArgs()
    _.extend(this, this._filteredArgs)
  }

  get args () {
    return this._args
  }

  get filteredArgs () {
    return this._filteredArgs
  }

  get result () {
    return this._result
  }

  get failed () {
    return this._failed
  }

  get errors () {
    return this._errors
  }

  get successful () {
    return this._successful
  }

  async tryExecuting () {
    if (_.size(this.errors)) {
      this._failed = true
      this._successful = false
      return
    }
    this._result = await this.run()
    this._successful = !_.size(this.errors)
    this._failed = !!_.size(this.errors)
  }

  addError (attribute, errorMessage, responseStatusCode = null) {
    if (attribute !== _.camelCase(attribute)) throw new Error(`${attribute} should be camel cased in addError()`)

    responseStatusCode && this.setResponseStatusCode(responseStatusCode)
    const errors = this._errors[this.constructor.name] = this._errors[this.constructor.name] || {}
    if (!errors[attribute]) return _.extend(errors, { [attribute]: `${_.startCase(attribute)} ${errorMessage}` })
    errors[attribute] = errors[attribute] instanceof Array ? errors[attribute] : [errors[attribute]]
    errors[attribute].push(`${_.startCase(attribute)} ${errorMessage}`)
  }

  mergeErrors (errors) {
    _.defaults(this._errors, errors)
  }

  setResponseStatusCode (responseStatusCode) {
    this._errors.status = this._errors.status || responseStatusCode
  }

  filterArgs () {
    return validate.cleanAttributes(this._args, this.constraints)
  }

  async validateServiceInputs () {
    const validationErrors = validate(this._args, this.constraints)
    const errors = {}
    _.forEach(validationErrors, (error, key) => {
      errors[key] = error[0]
    })
    if (_.size(errors)) {
      _.extend(this.errors, { [this.constructor.name]: errors })
    }
  }

  // Static methods

  static async run () {
    const args = arguments
    const instance = new this(...args)
    await instance.tryExecuting()
    if (_.size(instance.errors)) throw instance.errors

    return instance.result
  }

  static async execute () {
    const args = arguments
    const instance = new this(...args)
    await instance.tryExecuting()

    return instance
  }
}
