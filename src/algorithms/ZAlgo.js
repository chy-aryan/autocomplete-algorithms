function computeZArray(str){
    const n = str.length;
    const z = new Array(n).fill(0);
    let L = 0 , R = 0;
    for(let i = 1 ; i < n ; i++){
       if(i > R){
        L = R = i;
        while(R < n && str[R-L] === str[R]){
            R++;
        }
        z[i] = R - L;
        R--;
       }

       else {
        let k = i - L;
        if(z[k] < R - i + 1){
            z[i] = z[k];
        }

        else {
           L = i;
           while(R < n && str[R-L] === str[R]){
            R++;
           }
           z[i] = R - L;
           R--;
        }

       }
    }
    return z;
}

export function zSearch(text , pattern){
    if(!pattern) return true;
    if(!text) return false;

    const txtLower = text.toLowerCase();
    const patLower = pattern.toLowerCase();

    const concatStr = patLower + "$" + txtLower;
    const l = concatStr.length;

    const Z = computeZArray(concatStr);

    for (let i = 0; i < l; i++) {
    if (Z[i] === patLower.length) {
      return true; // Match found!
    }
  }

  return false;
}