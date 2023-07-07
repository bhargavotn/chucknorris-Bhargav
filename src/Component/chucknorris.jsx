import React, { useEffect, useState } from 'react';
import './chucknorris.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ChuckNorris() {
  const [categories, setCategories] = useState([]);
  const [jokes, setJokes] = useState({});
  const [activeCategory, setActiveCategory] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedJoke, setSelectedJoke] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://api.chucknorris.io/jokes/categories');
      const data = await response.json();
      setCategories(data);
      fetchJokesForCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchJokesForCategories = async (categories) => {
    try {
      const jokesData = {};
      for (const category of categories) {
        const response = await fetch(
          `https://api.chucknorris.io/jokes/random?category=${category}`
        );
        const data = await response.json();
        jokesData[category] = data;
      }
      setJokes(jokesData);
    } catch (error) {
      console.error('Error fetching jokes:', error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedJoke(jokes[category].value);
    setShowPopup(true);
  };

  return (
    <div className="chuck-norris-container">
      <h1 className="text-4xl text-green-500 animate-bounce font-bold m-3 text-center">
        Chuck Norris
      </h1>
      <div className="container">
        <div className="row">
          {categories.map((category, index) => (
            <div
              className={`col-sm-6 col-md-3 mb-4 ${
                activeCategory === category ? 'active' : ''
              }`}
              key={index}
              onClick={() => handleCategoryClick(category)}
            >
              <div className="card">
                <div className="card-body">
                  <p className="card-text">{category}</p>
                  {activeCategory === category && jokes[category] && (
                    <p>{jokes[category].value}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setShowPopup(false)}>
              &times;
            </span>
            <p>{selectedJoke}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChuckNorris;
