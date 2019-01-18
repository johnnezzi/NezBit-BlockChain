const Block = require('./block')

describe('Block', () => {
  let data, lastblock, block

  beforeEach((() => {
    data = 'bar';
    lastblock = Block.genesis();
    block = Block.mineBlock(lastblock, data )
  }))
  it('sets the `data` to match the given input', () => {
    expect(block.data).toEqual(data)
    
  });
  it('sets the last hash to match the hash if the last block', () => {
    expect(block.lastHash).toEqual(lastblock.hash)

  });
  it('generates a hash that matches the difficulty', () => {
    expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty))

  });
    it('lowers the difficulty for slowly mined blocks', () => {
      expect(Block.adjustDifficulty(block, block.timestamp+360000)).toEqual(block.difficulty-1);

    });
    it('raises the difficulty for slowly mined blocks', () => {
      expect(Block.adjustDifficulty(block, block.timestamp + 1)).toEqual(block.difficulty + 1);

    });
});