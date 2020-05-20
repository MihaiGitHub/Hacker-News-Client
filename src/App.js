import React, { Component, useState, useEffect } from 'react';

const App = () => {
  // create state with empty news array
  const [ news, setNews ] = useState([]);
  const [ searchQuery, setSearchQuery ] = useState('react');

  const fetchNews = () => {
    fetch(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
      .then(result => result.json())
      .then(data => setNews(data.hits))
      .catch(error => console.log(error));
  };

  // useEffect runs when component mounts and when there is a change in state
  useEffect(() => {
    fetchNews()
  }, [searchQuery]); // run useEffect only when searchQuery changes

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div>
      <h2>News</h2>
      <form>
        <input type="text" value={searchQuery} onChange={handleChange} />
        <button>Search</button>
      </form>
      {news.map((item, index) => (<p key={index}>{item.title}</p>))}
    </div>
  )
}

export default App;
