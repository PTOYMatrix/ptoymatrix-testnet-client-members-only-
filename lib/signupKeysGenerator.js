const GenerateMnemonic = require('./generateMnemonic')
const EcdsaKeyPairGenerator = require('./ecdsaKeyPairGenerator')
const DashKeyPairGenerator = require('./dashKeyPairGenerator')
const RsaKeyPairGenerator = require('./rsaKeyPairGenerator')
const CreateSignatureECDSA = require('./createSignatureECDSA')
const CreateSignatureRSA = require('./createSignatureRSA')
const Crypto = require('./crypto')

async function signupKeyGenerator (seed) {
  let { mnemonic } = await new GenerateMnemonic().run()
  mnemonic = seed || mnemonic

  const dash = await new DashKeyPairGenerator({ mnemonic }).run()
  const dashEnc = await new Crypto({
    operation: 'encryptAES',
    secretKey: dash.privateKey,
    dataString: mnemonic
  }).run()

  /** ECDSA */
  const ecdsa = await new EcdsaKeyPairGenerator({ mnemonic }).run()
  const ecdsaEnc = await new Crypto({
    operation: 'encryptAES',
    secretKey: ecdsa.privateKey,
    dataString: mnemonic
  }).run()

  const { ecdsaSignature } = await new CreateSignatureECDSA({
    privateKey: ecdsa.privateKey,
    messageString: ecdsa.address
  }).run()

  /** RSA */
  const rsa = await new RsaKeyPairGenerator().run()
  const rsaEnc = await new Crypto({
    operation: 'encryptAES',
    secretKey: rsa.privateKey,
    dataString: mnemonic
  }).run()

  const { rsaSignature } = await new CreateSignatureRSA({
    privateKey: rsa.nonHexPrivateKey,
    messageString: ecdsa.address
  }).run()

  const signupData = {
    ecdsaPubKey: ecdsa.publicKey,
    rsaPubKey: Buffer.from(rsa.publicKey).toString('hex'),
    ecdsaEncPrivKey: ecdsaEnc,
    rsaEncPrivKey: rsaEnc,
    walletAddress: ecdsa.address,
    rsaSignature: rsaSignature,
    ecdsaSignature: ecdsaSignature,
    dashAddress: dash.address,
    dashPubKey: dash.publicKey,
    dashEncPrivKey: dashEnc,
    mnemonics: mnemonic
  }

  return signupData
}

module.exports = signupKeyGenerator
