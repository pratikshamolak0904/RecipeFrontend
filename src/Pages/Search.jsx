import './Search.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = ({ setRecipes }) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // Wait for 300ms after the user stops typing

    return () => clearTimeout(delayDebounce); // Cleanup timeout
  }, [query]);

  useEffect(() => {
    const handleSearch = async () => {
      if (debouncedQuery.trim() === '') {
        setRecipes([]); // Clear results if input is empty
        return;
      }

      try {
        const response = await axios.get(`https://recipe-backend-three-lac.vercel.app/api/search?query=${debouncedQuery}`);
        setRecipes(response.data.message);
      } catch (error) {
        console.error('Error', error);
      }
    };

    handleSearch();
  }, [debouncedQuery, setRecipes]);

  return (
    <div>
      <input
        id="input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
      />
    </div>
  );
};

export default Search;
