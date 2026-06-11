class TrieNode {
  constructor() {
    this.children = {};
    this.isTerminal = false;
    this.data = null;
  }
}

export class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word, item) {
    let current = this.root;
    for (let i = 0; i < word.length; i++) {
      let char = word[i].toLowerCase();
      if (!current.children[char]) {
        current.children[char] = new TrieNode();
      }
      current = current.children[char];
    }
    current.isTerminal = true;
    current.data = item;
  }

  _findWords(node, results) {
    if (node.isTerminal) {
      results.push(node.data);
    }
    for (let char in node.children) {
      this._findWords(node.children[char], results);
    }
  }

  search(prefix) {
    if (!prefix) return [];
    
    let current = this.root;
    let prefixLower = prefix.toLowerCase();
    
    for (let i = 0; i < prefixLower.length; i++) {
      let char = prefixLower[i];
      if (!current.children[char]) {
        return []; 
      }
      current = current.children[char];
    }

    let results = [];
    this._findWords(current, results);
    return results;
  }
}