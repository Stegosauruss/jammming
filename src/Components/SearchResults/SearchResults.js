import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList.js';

class SearchResults extends React.Component {
  //returns list of results from input search
  render() {
    console.log(this.props.searchResults)
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults}/>
      </div>
    )
  }
}

export default SearchResults;
