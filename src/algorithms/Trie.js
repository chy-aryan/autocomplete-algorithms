// A node represents a single letter in the tree
class TrieNode {
  constructor() {
    this.children = {};
    this.isTerminal = false;
  }
}

export class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let current = this.root;
    for (let i = 0; i < word.length; i++) {
      let char = word[i].toLowerCase();
      if (!current.children[char]) {
        current.children[char] = new TrieNode();
      }
      current = current.children[char];
    }
    current.isTerminal = true;
  }

  // 2. Internal helper function 
  _findWords(node, prefix, results) {
    if (node.isTerminal) {
      // Capitalize the first letter so it looks nice in the UI later
      let formattedWord = prefix.charAt(0).toUpperCase() + prefix.slice(1);
      results.push(formattedWord);
    }
    for (let char in node.children) {
      this._findWords(node.children[char], prefix + char, results);
    }
  }

  search(prefix) {
    if (!prefix) return [];
    
    let current = this.root;
    let prefixLower = prefix.toLowerCase();
    
    for (let i = 0; i < prefixLower.length; i++) {
      let char = prefixLower[i];
      if (!current.children[char]) {
        return []; // If the letter branch doesn't exist, no cities match
      }
      current = current.children[char];
    }

    // If we successfully traced the prefix, gather all words branching below it
    let results = [];
    this._findWords(current, prefixLower, results);
    return results;
  }
}