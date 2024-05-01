
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
} from "@mui/material";


const ScifiImage = () => {
  const [query, setQuery] = useState('');
  const [imageResult, setImageResult] = useState(null);
  const [error, setError] = useState(null);
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/images/search?q=${query}`);
      if (response.data.message === 'Image not found') {
        setError('Image not found');
        setImageResult(null);
        return;
      }
      setImageResult(response.data);
      setError(null);
    } catch (error) {
      setError('Image not found');
      setImageResult(null);
    }
  };

  return (
    !loggedIn ? (
      <Box p={10} sx={{ display: 'flex', justifyContent: 'center', alignContent: 'flex-start' }}>
        <Typography variant="h3">
          Please
          <Link to={'/login'} >Log In</Link>
          to Continue
        </Typography>
      </Box>
    ) :
    <div>
      <h1>Serch Your Images</h1>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      {imageResult && (
        <div className="result-container"> 
        <div className="result">
          <h2>{imageResult.name}</h2>
          <img src={imageResult.imageUrl} alt={imageResult.name} />
        </div>
        </div>
      )}
    </div>
  );
};

export default ScifiImage;
