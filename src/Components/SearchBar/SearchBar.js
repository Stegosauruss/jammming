import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  //renders search bar for inputting requests to Spotify API
  constructor(props) {
    super(props);
    this.state = {term: ''};
    this.handleTermChange = this.handleTermChange.bind(this);
    this.search = this.search.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
  }

  handleTermChange(e) {
    //event handler to save current state of search bar input.
    let text = e.target.value;
    this.setState({term: text});
  }

  handleReturn(e) {
    //event handler to watch for presses of return to carry out a search.
    if(e.keyCode == 13) {
      this.props.onSearch(this.state.term);
    }
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
        onKeyDown={this.handleReturn}
        placeholder="Enter A Song, Album, or Artist"
        />
        <a onClick={this.search}>SEARCH</a>
      </div>
    )}
}

export default SearchBar;
