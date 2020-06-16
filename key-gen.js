const sdk = require('./index')

const {
  generateMnemonic: GenerateMnemonic,
  dashKeyPairGenerator: DashKeyPairGenerator,
  ecdsaKeyPairGenerator: EcdsaKeyPairGenerator,
  createSignatureECDSA: CreateSignatureECDSA,
  rsaKeyPairGenerator: RsaKeyPairGenerator,
  createSignatureRSA: CreateSignatureRSA,
  crypto: Crypto
} = sdk

async function signupDataGenerator () {
  const { mnemonic } = await new GenerateMnemonic().run()
  const dash = await new DashKeyPairGenerator({ mnemonic }).run()

  /** ECDSA */
  const ecdsa = await new EcdsaKeyPairGenerator({ mnemonic }).run()
  const ecdsaEnc = await new Crypto({
    operation: 'encryptAES',
    secretKey: ecdsa.privateKey,
    dataString: mnemonic
  }).run()
  const ecdsaSign = await new CreateSignatureECDSA({
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
  const rsaSign = await new CreateSignatureRSA({
    privateKey: rsa.nonHexPrivateKey,
    messageString: ecdsa.address
  }).run()

  console.log({
    signupReferenceId: '',
    ecdsaPubKey: `${ecdsa.publicKey}`,
    rsaPubKey: `${rsa.publicKey}`,
    ecdsaEncPrivKey: `${ecdsaEnc}`,
    rsaEncPrivKey: `${rsaEnc}`,
    walletAddress: `${ecdsa.address}`,
    rsaSignature: `${rsaSign.rsaSignature}`,
    ecdsaSignature: `${ecdsaSign.ecdsaSignature}`,
    dashAddress: `${dash.address}`,
    mnemonics: `${mnemonic}`,
    rsaNonHexPrivateKey: `${rsa.nonHexPrivateKey}})`
  })
}

signupDataGenerator()
