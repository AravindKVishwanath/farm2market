import CryptoJS from 'crypto-js';

export class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.isTampered = false; // Flag for UI demonstration
  }

  calculateHash() {
    // block_string = f"{self.index}{self.timestamp}{json.dumps(self.data)}{self.previous_hash}"
    const blockString = `${this.index}${this.timestamp}${JSON.stringify(this.data)}${this.previousHash}`;
    return CryptoJS.SHA256(blockString).toString();
  }
}

export class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, Date.now(), { role: 'System', info: 'Genesis Block', product: 'System Init' }, "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data) {
    const prevBlock = this.getLatestBlock();
    const newBlock = new Block(
      this.chain.length,
      Date.now(),
      data,
      prevBlock.hash
    );
    this.chain.push(newBlock);
    return newBlock;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const prevBlock = this.chain[i - 1];

      // Recalculate hash to check for data tampering
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      // Check if previous hash matches
      if (currentBlock.previousHash !== prevBlock.hash) {
        return false;
      }
    }
    return true;
  }

  // Helper to tamper with data for demonstration
  tamperBlock(index) {
    if (index > 0 && index < this.chain.length) {
      this.chain[index].data.quantity = "TAMPERED VALUE";
      // We intentionally do NOT update the hash to simulate a broken chain
      this.chain[index].isTampered = true; 
    }
  }
}
