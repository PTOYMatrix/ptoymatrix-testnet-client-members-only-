const mobileRegistration = require('./lib/mobileRegistration')
const mobileVerification = require('./lib/mobileVerification')
const generateMnemonic = require('./lib/generateMnemonic')
const ecdsaKeyPairGenerator = require('./lib/ecdsaKeyPairGenerator')
const dashKeyPairGenerator = require('./lib/dashKeyPairGenerator')
const rsaKeyPairGenerator = require('./lib/rsaKeyPairGenerator')
const createSignatureECDSA = require('./lib/createSignatureECDSA')
const createSignatureRSA = require('./lib/createSignatureRSA')
const encryptPrivateKey = require('./lib/encryptPrivateKey')
const decryptPrivateKey = require('./lib/decryptPrivateKey')
const signUp = require('./lib/signUp')
const getUserProfile = require('./lib/getUserProfile')
const login = require('./lib/login')
const uploadFile = require('./lib/uploadFile')
const signTransaction = require('./lib/signTransaction')
const submitTx = require('./lib/submitTx')
const getAllFiles = require('./lib/getAllFiles')
const getFile = require('./lib/getFile')
const dataDecryption = require('./lib/dataDecryption')
const getBalance = require('./lib/getBalance')
const transferPTOY = require('./lib/transferPTOY')
const submitPTOYTx = require('./lib/submitPTOYTx')
const healthCheck = require('./lib/healthCheck')

module.exports = {
  mobileRegistration,
  mobileVerification,
  generateMnemonic,
  ecdsaKeyPairGenerator,
  dashKeyPairGenerator,
  rsaKeyPairGenerator,
  createSignatureECDSA,
  createSignatureRSA,
  encryptPrivateKey,
  decryptPrivateKey,
  signUp,
  getUserProfile,
  login,
  uploadFile,
  signTransaction,
  submitTx,
  getAllFiles,
  getFile,
  dataDecryption,
  getBalance,
  transferPTOY,
  submitPTOYTx,
  healthCheck
}
