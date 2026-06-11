import React, { useState, useCallback, useMemo } from 'react';
import { debounce } from '../utils/debounce';
import cityData from '../data/cities.json';
import BenchmarkChart from './BenchmarkChart';

import { kmpSearch } from '../algorithms/Kmp';
import { zSearch } from '../algorithms/ZAlgo';
import { rabinKarpSearch } from '../algorithms/RabinKarp';
import { Trie } from '../algorithms/Trie'; 

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [metrics, setMetrics] = useState(null);

  const { allCities, cityTrie } = useMemo(() => {
    const flatList = [];
    const myTrie = new Trie(); 

    if (cityData && cityData.states) {
      cityData.states.forEach(stateObj => {
        stateObj.cities.forEach(city => {
          const item = { cityName: city, stateName: stateObj.name };
          flatList.push(item);
          if (myTrie.insert) myTrie.insert(city.toLowerCase(), item); 
        });
      });
    }
    return { allCities: flatList, cityTrie: myTrie };
  }, []);

  const executeSearch = (text) => {
    if (!text.trim()) {
      setResults([]);
      setMetrics(null);
      return;
    }


    const lowerText = text.toLowerCase();
    
    const startNative = performance.now();
    const nativeMatches = allCities.filter(item => 
      item.cityName.toLowerCase().includes(lowerText)
    );
    const nativeTime = performance.now() - startNative;

    const startKmp = performance.now();
    const kmpMatches = [];
    for (let i = 0; i < allCities.length; i++) {
      if (kmpSearch(allCities[i].cityName.toLowerCase(), lowerText)) {
        kmpMatches.push(allCities[i]);
      }
    }
    const kmpTime = performance.now() - startKmp;

    const startZ = performance.now();
    const zMatches = [];
    for (let i = 0; i < allCities.length; i++) {
      if (zSearch(allCities[i].cityName.toLowerCase(), lowerText)) {
        zMatches.push(allCities[i]);
      }
    }
    const zTime = performance.now() - startZ;

    const startRK = performance.now();
    const rkMatches = [];
    for (let i = 0; i < allCities.length; i++) {
      if (rabinKarpSearch(allCities[i].cityName.toLowerCase(), lowerText)) {
        rkMatches.push(allCities[i]);
      }
    }
    const rkTime = performance.now() - startRK;

    const startTrie = performance.now();
    let trieMatches = [];
    if (cityTrie.search) {
       trieMatches = cityTrie.search(lowerText); 
    }
    const trieTime = performance.now() - startTrie;

    console.log("Query:", lowerText);
    console.log("Trie Matches:", trieMatches.length);
    console.log("Trie Time:", trieTime);

    setMetrics({
      native: nativeTime,
      kmp: kmpTime,
      zAlgo: zTime,
      rabinKarp: rkTime,
      trie: trieTime
    });

    if (trieMatches.length > 0) {
      setResults(trieMatches.slice(0, 50));
    }

    else {
      setResults(kmpMatches.slice(0, 50));
    }
  };

  const safeSearch = useCallback(debounce(executeSearch, 300), [allCities, cityTrie]);

  const handleKeystroke = (event) => {
    const text = event.target.value;
    setQuery(text);       
    safeSearch(text);     
  };

  const handleSelect = (cityName) => {
    setQuery(cityName); 
    setResults([]);     
  };

  const highlightMatch = (city, matchText) => {
    const startIndex = city.toLowerCase().indexOf(matchText.toLowerCase());
    if (startIndex === -1) return city;

    const beforeMatch = city.slice(0, startIndex);
    const match = city.slice(startIndex, startIndex + matchText.length);
    const afterMatch = city.slice(startIndex + matchText.length);

    return (
      <span>
        {beforeMatch}
        <span style={{ color: "#4CAF50", fontWeight: "bold" }}>{match}</span>
        {afterMatch}
      </span>
    );
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif", position: "relative" }}>
      <h2 style={{ color: "#4CAF50", textAlign: "center" }}>Algorithm Laboratory</h2>
      
      <input 
        type="text" 
        placeholder="Search 100,000+ Indian Cities..."
        value={query}
        onChange={handleKeystroke}
        style={{ 
          width: "100%", 
          padding: "15px", 
          fontSize: "18px", 
          backgroundColor: "#1e1e1e", 
          color: "#ffffff",
          border: "2px solid #333",
          borderRadius: "8px",
          outline: "none",
          boxSizing: "border-box"
        }}
      />

      {results.length > 0 && (
        <ul style={{
          position: "absolute",
          top: "80px", 
          left: 0,
          right: 0,
          backgroundColor: "#1e1e1e",
          border: "1px solid #333",
          borderRadius: "8px",
          padding: "0",
          listStyle: "none",
          maxHeight: "300px",
          overflowY: "auto",
          boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
          zIndex: 1000
        }}>
          {results.map((item, index) => (
            <li 
              key={index}
              onClick={() => handleSelect(item.cityName)}
              style={{
                padding: "12px 15px",
                borderBottom: index === results.length - 1 ? "none" : "1px solid #333",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column"
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#2a2a2a"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
            >
              <span style={{ fontSize: "16px" }}>{highlightMatch(item.cityName, query)}</span>
              <span style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>{item.stateName}</span>
            </li>
          ))}
        </ul>
      )}

      <BenchmarkChart metrics={metrics} />

    </div>
  );
}
