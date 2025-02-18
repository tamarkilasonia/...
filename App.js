import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [movies, setMovies] = useState([]);  
  const [query, setQuery] = useState('');    
  const [isLoading, setIsLoading] = useState(false); 

  
  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=9073915e`);
      console.log(response.data);  
      if (response.data.Response === "False") {
        alert('No movies found, please try again!');
        setMovies([]);  // Clear any previous results
      } else {
        setMovies(response.data.Search);  
      }
    } catch (error) {
      console.error("Error fetching data:", error);  
    } finally {
      setIsLoading(false);  
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
      <button onClick={handleSearch}>Search</button>  {/* Trigger handleSearch on click */}

      {/* Display loading spinner */}
      {isLoading && <div>Loading...</div>}

      <div>
        {movies.map((movie) => (
          <div key={movie.imdbID}>
            <h3>{movie.Title}</h3>
            <img src={movie.Poster} alt={movie.Title} width="100" />
            <p>{movie.Year}</p>
            <p>{movie.Plot}</p>  {/* Display movie plot */}
            <p>Rating: {movie.imdbRating}</p>  {/* Display movie rating */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
