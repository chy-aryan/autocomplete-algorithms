import React, { useState, useCallback } from 'react';
import { debounce } from '../utils/debounce';

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const executeSearch = (text) => {
    console.log("Algorithm would now search 100,000 cities for:", text);
  };

  const safeSearch = useCallback(debounce(executeSearch, 300), []);

  const handleKeystroke = (event) => {
    const text = event.target.value;
    setQuery(text);       
    safeSearch(text);     
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h2 style={{ color: "#4CAF50" }}>Algorithm Laboratory</h2>
      <input 
        type="text" 
        placeholder="Search Indian Cities (e.g., Kanpur)..."
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
          outline: "none"
        }}
      />
      <p style={{ color: "#888", marginTop: "10px" }}>
        Current State: {query || "Waiting for input..."}
      </p>
    </div>
  );
}