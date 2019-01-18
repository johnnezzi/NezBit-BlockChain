const Block = require('./block')
const BlockChain = require('./index')

describe('Blockchain', () => {
  let bc, bc2;

  beforeEach(() => {
    bc = new BlockChain;
    bc2 = new BlockChain;
  });

  it('starts with a genesis block', () => {
    expect(bc.chain[0]).toEqual(Block.genesis())
  });

  it('adds a new block', () => {
    const data = 'foo'
    bc.addBlock(data)
    expect(bc.chain[bc.chain.length-1].data).toEqual('foo');
  });

  it('validates a new chain', () => {
    bc2.addBlock('foo')
    expect(bc.isValidChain(bc2.chain)).toBe(true);
  });

  it('invalidates a bad chain', () => {
    bc2.chain[0].data = ('bad data')
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it('validates a new chain', () => {
    bc2.addBlock('foo')
    bc2.chain[1].data = 'not foo'
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it('replaces the chain with a valid chain', () => {
    bc2.addBlock('goo')
    bc.replaceChain(bc2.chain);
    expect(bc.chain).toEqual(bc2.chain)
  })

  it('it does not replace the chain with one of less than or equal to length', () => {
    bc.addBlock('foo')
    bc.replaceChain(bc2.chain);
    expect(bc.chain).not.toEqual(bc2.chain)

  })
});

