import React, { useState, useEffect } from 'react';

function SearchHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    // Load search history from localStorage when the component mounts
    const savedSearchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    if (savedSearchHistory) {
      setSearchHistory(savedSearchHistory);
    }
  }, []);

  useEffect(() => {
    // Save search history to localStorage whenever it changes
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const handleSearch = () => {
    if (searchQuery) {
      setSearchHistory([...searchHistory, searchQuery]);
      setSearchQuery('');

    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchHistory.map((query, index) => (
          <li key={index}>{query}</li>
        ))}
      </ul>
      <button onClick={() => setSearchHistory([])}>Clear History</button>
    </div>
  );
}

export default SearchHistory;