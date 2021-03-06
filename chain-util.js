const EC = require ('elliptic').ec;
const uuidV1 = require('uuid/V1')
const ec = new EC('secp256k1'); //standards of efficient cryptology prime 256 bits, Koblites

class ChainUtil {
  static genKeyPair() {
    return ec.genKeyPair();
  }

  static id () {
    return uuidV1();
  }
}

module.exports = ChainUtil