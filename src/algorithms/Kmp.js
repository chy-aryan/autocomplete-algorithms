// 1. Helper function to compute the LPS array
function computeLPSArray(pattern) {
  const m = pattern.length;
  const lps = new Array(m).fill(0);
  
  let length = 0; 
  let i = 1;
  
  while (i < m) {
    if (pattern[i] === pattern[length]) {
      length++;
      lps[i] = length;
      i++;
    } else {
      if (length !== 0) {
        length = lps[length - 1]; 
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }
  return lps;
}

// 2. Main KMP search function
export function kmpSearch(text, pattern) {
  if (!pattern) return true; 
  if (!text) return false;

  // Converting to lowercase for case-insensitive 
  const txt = text.toLowerCase();
  const pat = pattern.toLowerCase();
  
  const n = txt.length;
  const m = pat.length;
  
  const lps = computeLPSArray(pat);
  
  let i = 0; 
  let j = 0; 
  
  while (i < n) {
    
    if (pat[j] === txt[i]) {
      j++;
      i++;
    }
    
    if (j === m) {
      return true; 
    }
    
     else if (i < n && pat[j] !== txt[i]) {
      if (j !== 0) {
        j = lps[j - 1]; 
      } else {
        i++;
      }
    }
  }
  
  return false;
}