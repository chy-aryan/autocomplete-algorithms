export function rabinKarpSearch(text, pattern){
    if (!pattern) return true;
    if (!text || pattern.length > text.length) return false;

    const txt = text.toLowerCase();
    const pat = pattern.toLowerCase();

    const m = pat.length;
    const n = txt.length;
    
    //Number of characters in input
    const d = 256;
    //prime number we will use to take modulus to prevent integer overflow
    const q = 101;

    let p = 0; // hash value for pattern
    let t = 0; // hash value for txt
    let h = 1; //value as power(d , m-1)%q we will use while removing the leftmost digit

    for (let i = 0; i < m - 1; i++){
        h = (h * d) % q;
    } // value of h computed

    for (let i = 0; i < m; i++) {
        p = (d * p + pat.charCodeAt(i)) % q;
        t = (d * t + txt.charCodeAt(i)) % q;
    }

    for (let i = 0; i <= n - m; i++){
        if (p === t){
            let j;
            for (j = 0; j < m; j++){
                if (txt[i + j] !== pat[j]) break;
            }

            if (j === m) {
                return true;
            }
        }

        if (i < n - m){
            t = (d * (t - txt.charCodeAt(i) * h) + txt.charCodeAt(i + m)) % q;
            if (t < 0){
                t = (t + q);
            }
        }
    }
    return false;
}