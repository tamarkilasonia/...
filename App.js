import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [movies, setMovies] = useState([]);  
  const [query, setQuery] = useState('');    
  const [isLoading, setIsLoading] = useState(false); // Set up state for loading

  // Function to handle search logic
  const handleSearch = async () => {
    setIsLoading(true);  // Set loading to true before fetching
    try {
      const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=9073915e`);
      console.log(response.data);  // Check the data in the console
      if (response.data.Response === "False") {
        alert('No movies found, please try again!');
        setMovies([]);  // Clear any previous results
      } else {
        setMovies(response.data.Search);  // Update movies state with search results
      }
    } catch (error) {
      console.error("Error fetching data:", error);  // Handle any errors during the fetch
    } finally {
      setIsLoading(false);  // Set loading to false after the fetch is done
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}  // Update query as user types
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
