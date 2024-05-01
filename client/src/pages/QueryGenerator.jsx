import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
} from "@mui/material";
import "./style.css";

const QueryGenerator = () => {
  const [query, setQuery] = useState('');
  const [queryResult, setQueryResult] = useState(null);
  const [error, setError] = useState(null);
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/query/search?q=${query}`);
  
      if (response.data.message === 'Query not found') {
        setError('Query not found');
        setQueryResult(null);
      } else {
        setQueryResult(response.data);
        setError(null);
      }
    } catch (error) {
      setError('Not Found');
      setQueryResult(null);
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
      <h1>Search Your Query</h1>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      {queryResult && (
        <div className="result-container">
          <div className="result">
            <h2>{queryResult.name}</h2>
            {queryResult.description.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryGenerator;
