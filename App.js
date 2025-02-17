import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [movies, setMovies] = useState([]); 
  const [query, setQuery] = useState('');    
  const [loading, setLoading] = useState(false);  // Add loading state

  const handleSearch = async () => {
    if (query.trim() === '') {
      alert('Please enter a search term!');
      return;  // Don't proceed if the query is empty
    }

    setLoading(true);  // Start loading

    try {
      const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=9073915e`);
      console.log(response.data);  
      if (response.data.Response === "False") {
        alert('No movies found, please try again!');
        setMovies([]);  
      } else {
        setMovies(response.data.Search);  
      }
    } catch (error) {
      console.error("Error fetching data:", error); 
    } finally {
      setLoading(false);  // Stop loading after the API request finishes
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search for a movie"
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <div>Loading...</div>}  {/* Show loading text while fetching */}
      
      <div>
        {movies.map((movie) => (
          <div key={movie.imdbID}>
            <h3>{movie.Title}</h3>
            <img src={movie.Poster} alt={movie.Title} width="100" />
            <p>{movie.Year}</p>
            <p>{movie.Plot}</p> 
            <p>Rating: {movie.imdbRating}</p>  
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
