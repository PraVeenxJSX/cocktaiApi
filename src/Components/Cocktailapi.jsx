import React, { useState, useEffect } from 'react';
import '../App.css';

const App = () => {
  const [drinks, setDrinks] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDrinks(data.drinks || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData('');
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    fetchData(searchTerm);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a drink"
          className="input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error: {error}</div>}
      {!loading && drinks.length === 0 && <div className="no-items">No items found</div>}
      {!loading && drinks.length > 0 && drinks.map((drink) => (
        <div key={drink.idDrink} className="data-card">
          <h2>{drink.strDrink}</h2>
          <p><strong>Category:</strong> {drink.strCategory}</p>
          <p><strong>Type:</strong> {drink.strAlcoholic}</p>
          <p><strong>Glass:</strong> {drink.strGlass}</p>
          <p><strong>Instructions:</strong> {drink.strInstructions}</p>
          <img src={drink.strDrinkThumb} alt={drink.strDrink} className="drink-img" />
          <ul>
            {drink.strIngredient1 && <li><strong>{drink.strIngredient1}:</strong> {drink.strMeasure1}</li>}
            {drink.strIngredient2 && <li><strong>{drink.strIngredient2}:</strong> {drink.strMeasure2}</li>}
            {drink.strIngredient3 && <li><strong>{drink.strIngredient3}:</strong> {drink.strMeasure3}</li>}
            {drink.strIngredient4 && <li><strong>{drink.strIngredient4}:</strong> {drink.strMeasure4}</li>}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default App;
