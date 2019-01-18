const Block = require('./block')

class Blockchain {
  constructor () {
    this.chain = [Block.genesis()]
  }

  addBlock(data) {
    const block = Block.mineBlock(this.chain[this.chain.length - 1], data);
    this.chain.push(block)

    return block
  }

  isValidChain(chain) {
    //checks the first block is equal to the genesis block
    if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
    //loops through the blocks and checks the lasthash value of the current block to the hash of previous block.
    for (let i = 1 ; i < chain.length; i ++) {
      const block = chain[i];
      const lastBlock = chain[i-1];
      if (block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block)) {
        return false
      }
    }
    return true;
  }

  replaceChain(newChain) {
    if (newChain.length <= this.chain.length) {
      console.log('Recieved chained is not longer than current chain');
      return
    } else if (!this.isValidChain(newChain)) {
      console.log('The recieved chain is not valid')
    }
    console.log('Replacing block chain with the new chain');
    this.chain = newChain
  }
}

module.exports = Blockchain