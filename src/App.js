import React, { Component, useState, useEffect } from 'react';

const App = () => {
  // create state with empty news array
  const [ news, setNews ] = useState([]);
  const [ searchQuery, setSearchQuery ] = useState('react');
  const [ url, setUrl ] = useState('http://hn.algolia.com/api/v1/search?query=react');

  const fetchNews = () => {
    fetch(url)
      .then(result => result.json())
      .then(data => setNews(data.hits))
      .catch(error => console.log(error));
  };

  // useEffect runs when component mounts and when there is a change in state
  useEffect(() => {
    fetchNews()
  }, [url]); // run useEffect only when url changes (when btn is clicked)

  const handleChange = e => {
    setSearchQuery(e.target.value)
  }

  const handleSubmit = e => {
    // prevent page from refreshing on submit
    e.preventDefault()

    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`);
  }

  return (
    <div>
      <h2>News</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchQuery} onChange={handleChange} />
        <button>Search</button>
      </form>
      {news.map((item, index) => (<p key={index}>{item.title}</p>))}
    </div>
  )
}

export default App;
