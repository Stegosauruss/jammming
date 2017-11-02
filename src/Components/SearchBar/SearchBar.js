import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  //renders search bar for inputting requests to Spotify API
  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" />
        <a>SEARCH</a>
      </div>
    )}
}

export default SearchBar;
