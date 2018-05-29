# ptoy-testnet-client

![banner](docs/images/PTOY-logo.jpg)

**WARNING**: This software is still under development (beta), may under go breaking changes as we get better.

## Overview

This is a client framework for building applications connecting to PTOY testnet blockchain.

The goal of the ptoy-testnet-client is to allow developers to easily create and test applications within the PTOY Network (testnet) without having to recreate common blockchain functionality. We visualize the SDK as the stand alone nodejs package to build blockchain applications on top of PTOY Network (testnet).

_Note: For now the ptoy-testnet-client only exists in javascript as nodejs module, which means developers can develop modules in Nodejs using this SDK. In the future, we expect that the SDK to be implemented in other programming languages._

## Prerequisites
- [Nodejs] (https://nodejs.org/en/download/)

## Key features (in  testnet):

 * ECDSA key pair generation.
 * RSA key pair generation
 * DASH key pair generation
 * Mnemonic generation.
 * Encrypt/Decrypt Private keys.
 * Create RSA and ECDSA signature.
 * Decrypt Data using hybrid encryption/decryption technique.
 * Sign raw transaction using ECDSA private key.
 * Store data
 * Retrieve stored data
 * Transfer PTOYs
 * Submit a PTOY transaction

### Quick Start

```js
const ptoy-testnet-client = require('ptoy-testnet-client');
```
`ptoy-testnet-client` contains the following services

* [`mobileRegistration`](#mobileRegistration) — Let the user to register with mobile number on the network
* [`mobileVerification`](#mobileVerification) — Let the user to verify the mobile number after registration.
* [`generateMnemonic`](#generateMnemonic) — To generate 12 word mnemonic.
* [`ecdsaKeyPairGenerator`](#ecdsaKeyPairGenerator) — To Generate ECDSA key pair and wallet address.
* [`dashKeyPairGenerator`](#dashKeyPairGenerator) — To Generate DASH key pair and wallet address.
* [`rsaKeyPairGenerator`](#rsaKeyPairGenerator) — To Generate RSA key pair and wallet address.
* [`createSignatureECDSA`](#createSignatureECDSA) — Create Signature by using ECDSA private key.
* [`createSignatureRSA`](#createSignatureRSA) — Create Signature by using RSA private key.
* [`encryptPrivateKey`](#encryptPrivateKey) — Encrypt String using AES encryption.
* [`decryptPrivateKey`](#decryptPrivateKey) — Decrypt String using AES encryption.
* [`signUp`](#signUp) — Let the user to Signup on the network.
* [`getUserProfile`](#getUserProfile) — Let the user to get profile from the network.
* [`login`](#login) — Let the user to login to the network.
* [`uploadFile`](#uploadFile) — Let user to upload a file to the network.
* [`signTransaction`](#signTransaction) — To sign a raw transaction with ECDSA private key.
* [`submitTx`](#submitTx) — Submit signed transaction to the network.
* [`getAllFiles`](#getAllFiles) — Let the user to get list of all files uploaded to the network.
* [`getFile`](#getFile) — Let the user to get single file uploaded to the network.
* [`dataDecryption`](#dataDecryption) — Let the user to Decrypt the file.
* [`getBalance`](#getBalance) — Let the user to check their PTOY balance on the network.
* [`transferPTOY`](#transferPTOY) — Let the user to generate raw transaction to network to transfer PTOY from one address to another.
* [`submitPTOYTx`](#submitPTOYTx) — Let the user to submit signed transaction to network to transfer PTOY from one address to another.

### Running Services

User cannot call these services directly, there are two ways to run the services listed above.

#### `.run()`

When you run the service by using `.run` then it will resolve promise with the result of service and reject promise if there is any kind of error including validation errors.

Example
```js
sdk.mobileRegistration.run()
  .then(console.log)
  .catch(console.log)

### Prints Error in catch function
  {
    MobileRegistration:
    {
      mobileCountry: 'Mobile country can\'t be blank',
      mobile: 'Mobile can\'t be blank'
    }
  }
###
```
#### `.execute()`

When you run the service by using `.execute` then it will resolve promise with the whole service object and reject promise if there is any kind of error including validation errors.

Example
```js
sdk.mobileRegistration.run()
  .then(console.log)
  .catch(console.log)

### Prints Service object in then function
  MobileRegistration
  {
    BASEURL: 'http://dev-patientory.ml',
    _args: undefined,
    _errors:
      {
        MobileRegistration:
          {
            mobileCountry: 'Mobile country can\'t be blank',
            mobile: 'Mobile can\'t be blank'
          }
      },
    _successful: false,
    _failed: true,
    _result: null,
    _filteredArgs: {}
  }
###
```

### Services

Each service can have the following keys

* _args — The first arguments you passed to the service using `.run` or `.execute` as object._
* _errors —  The error object returns by service if there is any error._
* _successful — `true` if service execution gets successful._
* _failed —  `true` if service execution gets failed._
* _result —  The result object returns by service._
* _filteredArgs — Filtered args which is used by service from `_args` object._

#### Parameters

> if you need to pass any parameters to service, pass it as an object.

Example

```js
sdk.ecdsaKeyPairGenerator.run({ mnemonic: 'dress enroll clinic friend expire spawn tone dirt become girl crater food' })
  .then(console.log)
  .catch(console.log)
```

#### mobileRegistration

This service is used to register mobile number on PTOY Network (testnet).

> Parameters
  * mobileCountry — {string} Country code of user mobile number.
  * mobile — {string} mobile number to register.

Returns

```js
{
  referenceId: '9ff972b8-5b67-4ed0-aacb-0b7258aef25c'
}
```

#### mobileVerification

This service is used to verify mobile number after registering number on PTOY Network (testnet).

> Parameters
  * referenceId — {string} result of [mobileRegistration](#mobileRegistration) service.
  * mobileOtp — {string} otp code recieved on provided number.

Returns

```js
{
  signupReferenceId: '0b71101b-bf52-4e46-af7b-71d053604b60'
}

### generateMnemonic

This service is use for generate 12 words mnemonic

Returns

```js
{
  mnemonic: 'lion clinic dice minute never injury dice ankle patch jar body corn'
}
```

#### ecdsaKeyPairGenerator

This service is used to generate ECDSA key pair.

> Parameters
  * mnemonic — {string} mnemonic code generated by [generateMnemonic](#generateMnemonic) service, or any valid mnemonic code.

Returns

```js
{
  privateKey: '66d36c3799592d015381a3a6e98197efa18c511e47c20e9003ecd4a12b922613',
  publicKey: 'f6e126ad2c5124000a17a884b3fabcb83d1de4e4eec626f161fcfa0c05886a5fea276df07028c5de47af780b65b0f78484892b4ce02680dd22a275abe72e5a03',
  address: '0x7bc7f62e7a903c9a46f7d7ead50880e54acc2755'
}
```

**Note:** Public/Private key is in hex format.

#### dashKeyPairGenerator

This service is used to generate DASH key pair in `testnet`.

> Parameters
  * mnemonic — {string} mnemonic code generated by [generateMnemonic](#generateMnemonic) service, or any valid mnemonic code.

Returns

```js
{
  wif: 'Buz1VPmeQCcgTWRvs93HycNvs37Au4ynuqFAmJK6v2BPMmd7aLvT',
  address: 'CBgaPkSpHJv6vDmMgcdaKRj8pZUnooMNWF',
  publicKey: '0286a09266471fbba31273f95a6b550a9f7ab02842221e92a47b39430f2b271c9e',
  privateKey: 'c68fdbdf6d1e6fd8d60bc707b076d24c93a3e52e76c813a13f1ff2b071c51aa8'
}
```

#### rsaKeyPairGenerator

This service is used to generate RSA key pair.

Returns

```js
{
  privateKey: '2d2d2d2d2d424547494e2050524956415445204b45592d2d2d2d2d0a4d494945767749424144414e42676b71686b6947397730424151454641415343424b6b776767536c41674541416f4942415143677179704774547131364d776b0a6e35666e49357739424c357777666e716c43524934335670644252484b4b524c3458517935307477686963777065397337555a6c4a745778342f704641706e590a6554476e6a356677684d306e6c564d6f6c4d59456f717477664d4d35692f6c34702f57784e676553462f5052534e68436e4a372f673443644b746858703345710a53375835596f454470764e6a4959516435424e515169797156576e30614944564a617150666d34373570664d7a6c4a564a6a2b37734c324834662b566d5575660a7475777447662b5a46384e352b3139684d70713357437078454f5357797238346e6b7a473153497070796670523062616c6d4d584f47746a682f57734c694d620a50303648696c374b505576736c3175324c5666716e6742744342714168475562596c3375356a56393137324e59474e6867786663465942454841734e727348620a6b6e6c46786f776e41674d424141454367674542414a4948774a385072564d565369616e5833745835484f5a556a5a4f4f4159377131634d56665549366a31610a39536c36757842684a544961334a66633265615a4b6e685a656254377a736257664670436e527a383645355668646e4b5952447256366479366e754e4369764e0a793273637a62544a744d76574e57637333464a2b35417938797a4d4f644341484d6c594e426c4b71637a534d6b33367751644b684c2b53736f4d67595a6673620a5832676e51576f304a7751386148567942442b6a4a6a525757784d366f3145616e6d54695052334c35502f797a6d4539524d586b46356530416b764963716e430a34637461504c6b50326a716346324649595a596c6d504b56616b754f2b6b7043744c4d6a323761737569677657514876546c756e774774492f3147754f5256390a49774f4542434a47596975475468627864347431484731474a6b6a554d316e4a55684335776869776d6c4543675945412b35786e4a684d3036632b57676259310a782f44643344534f4d566650395947574a6d4e784556677065394f4261365664656d4868443536496b3579666253596b624134506f65546b327167764e3638770a335a412f73666b37397535306e5335364830562b453346355463594e34774e5244766b384b6f48436b7a35437868726e3834587134643736415375476776304e0a4455364a55423774504a4476326d67335048557969464c66546f4d43675945416f33696d496b69393553776d58466349796d6471413979784e624f5a6f38614b0a6a367a3932397a3062426d346a335867374265645132327652534f596c3257785147315268762f557a36586935472f43534966587a784a61324e5462776c6b560a414b6643416d4e51426d57675155356b4443784f46663277322b505236514f3145345535733530634f62376d2f5731614d58384c554d693143505134715530790a584c347949646a46476f30436759413234367259386f327a694262455731536d4e705366796c4e4f7a6d4a4f6f364e32346e437a4950474430754e4438594a510a4258524d7251414d65376d483353394b35314a667467683637762f462f524543394d6f4163476531656457307949505a754a5a46645a624a38612f72327a68650a744e3538513279494a4b663667626f694e512f466b4a676e6b7a41332b53355576644a557954706c345253434b41514d7932426e767652364d774b42675143440a39646a6d784348473569547856624461387a4135666558766d395069795673424d4879644233696e367674356b34624744796e385449613449557745717971790a2f3478596c68794d6f7a544e67776f71307233376771326a612f4561716836794d4c6f456733634f4d7574797a48306d396e7a796336425a5955634a2b7477700a72646f756a42314534443548526763512f615638795169612b63726a6f46575057466e50794e555434514b42675143542f786c463968745572664a7952766c310a53445450457867436b724c6e5a71566b53726b6935665a4430536b363457664a78575a7a742b626c666568704949364c42332b51756a774867436a6d514a45460a734e763149743362723458415a7258416462797651496530726837486a455077325261394d656f716e574b7868577045466b337a3750534c554270664d64487a0a70795873525667466c326e31474d312f756359756f6a5a386a773d3d0a2d2d2d2d2d454e442050524956415445204b45592d2d2d2d2d',
  publicKey: '2d2d2d2d2d424547494e205055424c4943204b45592d2d2d2d2d0a4d494942496a414e42676b71686b6947397730424151454641414f43415138414d49494243674b43415145416f4b73715272553674656a4d4a4a2b5835794f630a5051532b634d48353670516b534f4e31615851555279696b532b46304d75644c6349596e4d4b5876624f31475a5362567365503652514b5a32486b7870342b580a3849544e4a3556544b4a5447424b4b7263487a444f597635654b6631735459486b68667a30556a59517079652f344f416e537259563664784b6b75312b574b420a4136627a597947454865515455454973716c567039476941315357716a3335754f2b61587a4d35535653592f75374339682b482f6c5a6c4c6e3762734c526e2f0a6d5266446566746659544b61743167716352446b6c73712f4f4a354d787455694b61636e3655644732705a6a467a6872593466317243346a477a394f683470650a796a314c374a64627469315836703441625167616749526c47324a6437755931666465396a57426a59594d58334257415242774c4461374232354a355263614d0a4a774944415141420a2d2d2d2d2d454e44205055424c4943204b45592d2d2d2d2d'
}
```

**Note:** Public/Private key is in hex format.

#### createSignatureECDSA

This service is used to generate ECDSA Signature

> Parameters
  * privateKey — {string} ECDSA private key.
  * messageString — {string} message to sign.

Returns

```js
{
  ecdsaSignature: '448fd2e543fb1179afbd4bbaa61d5df2573ac57fa18f960a02f224d0bc1a187803ce5e0a38127fbebfd40fe7e129875207e779785ecfbc4ad983aa3909d9d25c28'
}
```

### createSignatureRSA

This service is used to generate RSA Signature

> Parameters
  * privateKey — {string} RSA private key in `utf8` format.
  * messageString — {string} message to sign.

Returns

```js
{
  rsaSignature: '4035f7ab1709315c6f7f328fb8d8668b6df6a60508bbbe0baa365662cdbc4efb70803cc86a3158275e821b97df36302e44789ef80a4220f66c4378f366ce01cd825bd1b3f4c5db787531d0fb9c45f4532867f8b6a218e7da9bb6a5fc54c998e7791b18b456128b76034a5f1a44d3e4257ba5a8c4cc66694839d4c615f75fd8919a99d844785fd1924ee446f33ef9aa7ba162619169179ca15fbd605b6bd40f5704307ba390dcb4f6a2cfad80fd614519c067ae1533f8f50ef3c3265d4806e77a00301688b55ddbf124387e29dc4d94f3a651b2ef594a5f9830be76d3d8d401281b66d71de0317e3f02c713b47737bc7502c0e30934f180eb2bbc5db4ddbeb123'
}
```

### encryptPrivateKey

This service is used to encrypt Private key, user can also encrypt normal string using AES encryption.

> Parameters
  * key — {string} key to encrypt.
  * secret — {string} secret which encrypts the key.

Returns

```js
{
  encryptedKey: '7d52d10688b7755ff18ddb597e32ad8d47e804c05d1a97800bbbbb2d90503c51f2c6c923f0679a3deb092655ca669bbadf65175b588c77ddaacd58e1e6232fb1'
}
```

### decryptPrivateKey

This service is used to decrypt Private key, user can also decrypt normal string using AES encryption.

> Parameters
  * encryptedKey — {string} encrypted key to decrypt.
  * secret — {string} secret which decrypts the key.

Returns

```js
{
  decryptedKey: '66d36c3799592d015381a3a6e98197efa18c511e47c20e9003ecd4a12b922613'
}
```

### dataDecryption

This service is used to decrypt the data downloaded from PTOY Network (testnet) using hybrid encryption/decryption and store it to a file.

> Parameters
  * encryptedFilePath — {string} encrypted file which user gets from [getFile](#getFile) service.
  * rsaPrivateKey — {string} user rsaPrivateKey in `utf8` format.
  * secrets — {string} secrets which user gets from [getFiles](#getAllFiles) service.
  * decryptedFilePath — {string} file path where user wants the decrypted file to write.

Returns

```js
{
  decryptedFilePath: 'file path provided'
  secretes: 'decrypted secrets'
}
```

### signUp

This service is used to sign up user on PTOY Network (testnet)

> Parameters
  * ecdsaPubKey — {string} ECDSA pub key in `hex` format.
  * rsaPubKey — {string} RSA pub key in `hex` format.
  * ecdsaEncPrivKey — {string} ECDSA Private Key in encrypted format.
  * rsaEncPrivKey — {string} RSA Private Key in encrypted format.
  * walletAddress — {string} ECDSA wallet address.
  * dashAddress — {string} DASH wallet address.
  * signupReferenceId — {string} sign up reference id user gets from [mobileVerfication](#mobileVerfication) service.
  * rsaSignature — {string} RSA sigature for message as ECDSA wallet address.
  * ecdsaSignature — {string} ECDSA sigature for message as ECDSA wallet address.

Returns

```js
{
  tokens: {
    access_token: "fe5625bbcf614de57e50e4ca31543f47e7d9c400c86ea7c31f75965f0b0fa8cb6124ef0bee1a1c9fed9382104c6a4504",
    refresh_token: "f5b673aab488eb77252f0841cd86b55b79d3144589191c0b0f5da5db2afc1ea3e6fb129dc01295ae711646d53c01a25c",
    expires_in: "2018-02-05T14:26:35.242Z",
    token_type: "Bearer"
  },
}
```

### getUserProfile

This service is used to get user profile from PTOY Network (testnet).

> Parameters
  * accessToken — {string} access token user gets from [signup](#signup) or [login](#login) service.

Returns

```
{
  "mobile": "1234567820",
  "mobileCountry": "+1",
  "walletAddress": "0x10fc0757c2b3b841d4f099532455c6d6c2b96d86",
  "fullName": "",
  "dob": "",
  "sex": "",
  "ecdsaEncPrivKey": "0x6464396266643066336365643233636136646261323133313338616138333739333362626466326261343435616566616664313266626561326264316437393533396437646432313634643335333665663139633037363361643339316338626331366131663366653131636462653536643532653932306464633563353634",
  "rsaEncPrivKey": "0x63306430653434303733396530336566313339303634303535383835656435653536633739633035383737646235653665313064623038333030616266636535326461346131303731326634326134363834633930643237663536373432616163303263313734656333376166646332316532353863353661366566616132323064353566383464323035653239323163656436653965643537356636353866666135313038666337373661666337623838613338356664623864643963343635356631396466396330386434343366346363393537386166363564353563636663313736373231366533363661356262396639346534623664646665363261623163303261333161663531366332343334373266356338383239393034623639363435376662323236663537383361346466643339333637346238393239316537353337303766343265316337613264376165656361383262333931386566356339623638613434623039356438636138303162633631333936656166366338393866366463353731386165616236666339303431626664623034383438653533326162633435326531616131316662366161653231396465373766383363393836333639643337643135313234643237633437356166303761616664636331666162323231396332313733363863393132386337303533666363633135363135646566316138623762313633336635353866613065323930376665363638396330626164626266366138336664663239356138373834306132353965343730323333383932666431653038303331653134333432383266653962623139623536303938316630326637353164386638333837663232366539323237383632373433646562623765666166373537623239353932353864643030366663646238636435666334353338373964306333353436383638383265376234363161313032333765346564623665353739313938633539626663373864613738643761343966306333306363353239353530643030336635653464393131326263343039653034623565356161313231396637316335343035636431633235376532356339623038316461393434653366643162393535303939303662373461383866393862356336393263666131323239393661353633376261393034346430333335323365326138313965653633353836383333663438376138326462316433333532303263353230393432323636303332306436656439353764613265626630656434386363386133663466313366633437653164303961366534353930386565643963646639306334316430663839346136303564373130366532316231646464383536356535393265623430356237646266656331366638343163343738663066343538366130663662346237393738666462653331633236346266376431656164316635326235663232353365343265353565363266323231373036343637666132306533376536663033383164346131306330623333646265383434373133336433316236313333636138333962356532613064633962656466393066373262353363643035643435396333656165316362366236323963616236313339343366383861376238353935393733356265613439613530623432313330666264333965643566326162383534353334343266303162313738316439333065633463336534313937363931326365393037356139356436613132343365356437323834373232353834346265333665373463616639326661393862653636343038383565353835363362376330613164623538303865353264373134323839386233373339383161623436363537396161643062326164623465366333333637633238616532393562373739666462366234303332633538363566653765363064633033666662306133373032333339376439336565343532366539616337393235663865653836343162333531373837646538653536306563643838346563333262633234633266613163616631636165333465376531393963326232343262383963303561353638333838323666343234356337663639323630626330643337366432336331643334326665353565343334336235383433623532303361343136343561373937303030643733306531623134366561653439616166323464386432333639333833373333336662333337656438613130343962303563646662356333613938656638646531613563376361623062313063356232356632313166643161393934353038353261303138336432363234636439623237616533393030623336366336646363663138663838623665303966373638333562386431623066333838306333646638636338643962636530366664393064333631633231396666393065343336343465383466653135303963313831653431386637393636636433343033306234316137643639306134333865303963336330613562636337336665613332373663383266653436326332373666346232386265383730323238303238373731383131646366613630376638336163623763356432643238356532343361633663626634336238303435353762626634666363396537613438323535363430663162653433663136303234356663323063313962383662623634353461616466353133633438383630343766646535373032613533623935396165383434363261333464656631396463303938383561633633323162363862336365333037303662353933336232316136633364336131626135613436356630656365633630643434663239666666373361346362323630353030366461643134383034336664323834316461353630306166383765313466336430313639366334313430623838626639653737633235353062656130363230363065633233613434313336316130333266363938623035396235653539663336396337363864343134353337373466383066323132643537363839313037636532363838616538313066393138636132316262396436383431363734646537353762323932333539613235653433646633343831336534633266363633323939643134336565353431616661633134343031363339666565666433326139363434373039656337313936353835343863633263356163346461646135396136636364313233373264346364303133363466666632373938343835393830373037323439613431363734393238343038383335386666636235333133386431313832663462336363396434663766333337626565636264313638626561336436303737623764373435396262343530366232323130353631363739633539653864346132373434393562373230656536616137316436613763356163313733613462323238623932643362363066363533653232323239626466646638313130646466393233306434643132383062623864346339376133323562313764353061326363653133336262303336303939616136386663373139343232363161393161383738626265653737653736396162396233663961393764636464303135386164633935663565666565626335313539666434643637316130366537656231346235656564646239626363653862303464376563623935613236376234616336613065623533666163633834623733303535386135666462656562646465656130343238316236646134663534316338656336383936373832616435623136646139373461643337653430373536336664643238323038393866303533323966343666623330653731343561396434316337383035313732623539386462613732356530383035383066383631633261363362613037346130316164636536326464633863323932356230373330376438623031626436653537353365313266643735393334353836396461376236386562626137633661333162376565386639373664346265373661353164303737306532666634333434306163356536613234386132336230336566323166383034636632633663333534663762313231366461663233366464663038613137313964376139323961333663396236333535646362623037386263623533623537333763363864663063323438356239353934613035333263656261383334323937656265656566663061633039356666336237353362383965346565366337336532333737393766346164343235656538333538613932396336323066623766333266316231626434333333623064653539386631376436346334613434323063626535633636666565653330333962316266343162666664316431393863656563303736306562623661623230613262333566366264303331653539346162646438336435316331653839323163663662643563333835343465333662613834373063363431386265366134353139363031376461393765623233313033656665633138326332656663636263393865663532623937333537346165663162633837616339623432646435326331356162316234663138353961313030636265393730373832383835633839303939336232313061386336623433663939303162623964386236353230336264643334346635656337356666",
  "ecdsaPubKey": "0x3532313038366139623162643163336565323363636664653237353461663133343437616237656135656230623039393933633664306364353037316234326231363939306161633036323334316631643235646266343165386361306662343962313231323431346335663162346431613938376364363966613037303733",
  "rsaPubKey": "0x326432643264326432643432343534373439346532303530353534323463343934333230346234353539326432643264326432643061346434393439343234393661343134653432363736623731363836623639343733393737333034323431353134353436343134313466343334313531333834313464343934393432343336373462343334313531343534313734363833323561366136373663353435363533373935363432333334363638373236643730353830613731333936353266333234313530366333323463363333393336373534653637363635393663373236643732346637613738353433303733366634623330346337343633353832623665333836393339373934663735353234343433343534643737343532623739373334323663353434353433343333323732363436653438306137333332343733333464353935373561333236313662326233303738343533343333363237333664353632623661373436343534363433313339333137383632363934663734373036663636363134343533343137363462346236613432343534643436366134323435333335313534373835333465343436623634333535353061353535333464353937393632363233303438333834313438343336363661343937383636343636373635363135383438363136383736366134623464353732623639333737393338346637313736346634363739366336343437363436353732366237373538366433353533363736373631363734363730333435393631366330613333373734353330343337393639346236643730333633373333373635333334343735613330333434653464363232623266366134613662333336653533366234393434366134383438333137333432346236393736363134663761363133373439363733303466373435363737353336333634343134613438353034373635306133313463346237333331373736643333366135383737373434363434346636663461373234613437333132623561333034383439366234383262373734653532343434613335373735393266333433353632363234343532353236323436343437373531326636353666343936323661333534613331333636343338363733323061326237373439343434313531343134323061326432643264326432643435346534343230353035353432346334393433323034623435353932643264326432643264",
  "dashAddress": "XqHt831rFj5tr4PVjqEcJmh6VKvHP62QiM",
  "freeTierPlanInfo": {
    "type": "free",
    "planName": "Free Plan",
    "storage": 10,
    "storageUnit": "MB"
  },
  "userStorageStatInfo": {
    "storageUsed": 7.87,
    "storageUnit": "MB"
  }
}
```

### login

This service is used to login user on PTOY Network (testnet).

> Parameters
  * walletAddress — {string} ECDSA wallet address.
  * ecdsaSignature — {string} ECDSA sigature for message as ECDSA wallet address.

Returns

```js
{
  tokens: {
    access_token: "fe5625bbcf614de57e50e4ca31543f47e7d9c400c86ea7c31f75965f0b0fa8cb6124ef0bee1a1c9fed9382104c6a4504",
    refresh_token: "f5b673aab488eb77252f0841cd86b55b79d3144589191c0b0f5da5db2afc1ea3e6fb129dc01295ae711646d53c01a25c",
    expires_in: "2018-02-05T14:26:35.242Z",
    token_type: "Bearer"
  },
}
```

### uploadFile

This service is used to upload user file on PTOY Network (testnet).

> Parameters
  * accessToken — {string} access token user gets from [signup](#signup) or [login](#login) service.
  * filePath — {string} filePath to upload file.
  * fileName — {string} name of the file.

Returns

```js
{
  from: '0x7bc7f62e7a903c9a46f7d7ead50880e54acc2755',
  nonce: '0x0',
  gasPrice: '0x0',
  gasLimit: 22222222,
  to: '0x26a00f68abeca192673fb9ce88f9f1e5a920efda',
  value: 0,
  data: '0x7a687b93000000000000000000000000a0c2400a21bc399fe0db98e321fcda45b970202e00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001'
}
```

User need to sign this raw transaction with ECDSA private key using [signTransaction](#signTransaction) service. And submit tx to PTOY Network (testnet) using [submitTx](#submitTx) service.

### signTransaction

This service is used to sign raw transaction with ECDSA private key.

> Parameters
  * rawTx — {object} raw transcation to sign.
  * privateKey — {string} EDSA private key to sign the transaction.

Returns

```js
{
  signedTransaction: '0xf8c68080840153158e945729686923852facb60db5247825387738e8444680b8647a687b93000000000000000000000000a0c2400a21bc399fe0db98e321fcda45b970202e000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000011ba040962bedbedfb01c084c027fe3557e5018a257ef812538bbab5319a8019fde47a047399ed089b9f239ba424e7e30ba328a7b2bff3f88f9d6a8294bcf7c5a133ebe'
}
```

### submitTx

This service is used to submit signed transaction to PTOY Network (testnet).

> Parameters
  * accessToken — {string} access token user gets from [signup](#signup) or [login](#login) service.
  * signedTx — {string} signed Transaction which user gets from [signTransaction](#signTransaction) service.

Returns

```js
{
  txHash: "0xe85285373af4299fb945c220360b47754c4354a1fc34bfaabc6f97825cebbc10"
}
```

### getAllFiles

This service is used to get all user files uploaded to PTOY Network (testnet).

> Parameters
  * accessToken — {string} access token user gets from [signup](#signup) or [login](#login) service.

Returns

```js
{
  "0xa0c2400a21bc399fe0db98e321fcda45b970202e": {
    "gitignore": {
      "link": "/api/v1/user_file/0xa0c2400a21bc399fe0db98e321fcda45b970202e/gitignore",
      "secretKey": "8cedb597ab3892bfc5bdb556c10793d3e627e70412ac3a9b041a68e20fdee68e9cac2356ec918686c60e67749ee74a2e9305d90133bcddc031f8a1b32c7a2dc596e8dfc37c74d21235bfd778117d21139f2f1d425735cefed2ceb44b95cd5cf5ac553a9d372282a0293ba87e61b1710e93d9a8ce5c3ac51de63c974a45e599d66a9e4ebc999e574cd4f8504b7c2f9825480348386b1e00b505a8d1d15767d7e80fe466f657eb043d5e2f4a16ccff10c0b281b54284519a3b2eaf6b829fd805818a592bf7b09de766375ec4294cc7604480d461945c716683b593673c50ca88c2c90fb6bab6103db12ac54758331f318757810bd9e19e18f957f07e67f14508fa",
      "ipfsHash": "QmZqkzLCsiGqND7HsN61gy5RYDXVUExaxnvDXJJRanoasq"
    }
  }
}
```

The format of object is

```
{
  "uploaderWalletAddress": {
    "fileName": {
      "link": "link to downalod the file",
      "secretKey": "secrets to decrypt the file",
      "ipfshash": "ipfs hash of file"
    }
  }
}
```

### getFile

This service is used to get single file from the PTOY Network (testnet).

> Parameters
  * accessToken — {string} access token user gets from [signup](#signup) or [login](#login) service.
  * fileLink — {string} file link which user gets from [getAllFiles](#getAllFiles) service.
  * fileName — {string} name of the file to save the file in user system.

Returns

```js
{
  encryptedFilePath: 'gitignore'
}
```

### getBalance

This service is used to get user balances from PTOY Network (testnet).

> Parameters
  * accessToken — {string} access token user gets from [signup](#signup) or [login](#login) service.

Returns

```js
{
  "ptoyBalance": 200,
  "dashBalance": 2,
  "etherBalance": 1
}
```

### transferPTOY

This service is used to transfer PTOY from one wallet address to another.

> Parameters
  * accessToken — {string} access token user gets from [signup](#signup) or [login](#login) service.
  * toAddress — {string} signed Transaction which user gets from [signTransaction](#signTransaction) service.
  * value: {string|number} number of PTOY user wants to transfer.

Returns

```js
{
  from: "0xe06c0041bd146d98adfc739b1e5329bf0d7c5482",
  nonce: "0x0",
  gasPrice: "0xee6b2800",
  gasLimit: 36954,
  to: "0x26a00f68abeca192673fb9ce88f9f1e5a920efda",
  value: 0,
  data: "0xa9059cbb000000000000000000000000b5b0c58a803450b253ae9408becb41cd88ba1dc20000000000000000000000000000000000000000000000000000000000000001"
}
```

User need to sign this raw transaction with ECDSA private key using [signTransaction](#signTransaction) service. And submit tx to PTOY Network (testnet) using [submitPTOYTx](#submitPTOYTx) service.

### submitPTOYTx

This service is used to submit signed transaction to PTOY Network (testnet).

> Parameters
  * accessToken — {string} access token user gets from [signup](#signup) or [login](#login) service.
  * signedTx — {string} signed Transaction which user gets from [signTransaction](#signTransaction) service.

Returns

```js
{
  signedTransaction: '0xf8c68080840153158e945729686923852facb60db5247825387738e8444680b8647a687b93000000000000000000000000a0c2400a21bc399fe0db98e321fcda45b970202e000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000011ba040962bedbedfb01c084c027fe3557e5018a257ef812538bbab5319a8019fde47a047399ed089b9f239ba424e7e30ba328a7b2bff3f88f9d6a8294bcf7c5a133ebe'
}
```

## License

- Open-source [MIT](https://github.com/PTOYNetwork/ptoy-testnet-client/blob/master/LICENSE).