import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
} from "@mui/material";
import "./style.css";

const MemoGenerator = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/medicines/search?q=${query}`);

      if (response.status === 200) {
        // If medicines are found
        setResults(response.data);
        setError(null);
      } else {
        // If no medicine is found
        setError('Memo not found');
        setResults(null);
      }
    } catch (error) {
      // If an error occurs during the request
      setError('Error searching for memo');
      setResults(null);
    }
  };

  return (
    !loggedIn ? (
      <Box p={10} sx={{ display: 'flex', justifyContent: 'center', alignContent: 'flex-start' }}>
        <Typography variant="h3">
          Please <Link to={'/login'}>Log In</Link> to Continue
        </Typography>
      </Box>
    ) :
      <div>
        <h1>Search Your Memo</h1>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
        {error && <p>{error}</p>}
        {results && results.map((memo, index) => (
          <div key={index} className="result-container">
            <div className="result">
              <h2>{memo.name}</h2>
              <p>{memo.description}</p> 
            </div>
          </div>
        ))}
      </div>
  );
};

export default MemoGenerator;
