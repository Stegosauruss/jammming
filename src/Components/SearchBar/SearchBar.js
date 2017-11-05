import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  //renders search bar for inputting requests to Spotify API
  constructor(props) {
    super(props);
    this.state = {term: ''};
    this.handleTermChange = this.handleTermChange.bind(this);
    this.search = this.search.bind(this);
  }

  handleTermChange(e) {
    //event handler to save current state of search bar input.
    let text = e.target.value;
    this.setState({term: text});
  }

  search(e) {
    //event handler to log search input to App.state when search is clicked.
    this.props.onSearch(this.state.term);
  }

  render() {
    return (
      <div className="SearchBar">
        <input
        onChange={this.handleTermChange}
        placeholder="Enter A Song, Album, or Artist"
        />
        <a onClick={this.search}>SEARCH</a>
      </div>
    )}
}

export default SearchBar;
