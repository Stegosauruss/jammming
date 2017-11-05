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
    let text = e.target.value;
    this.setState({term: text});
  }

  search(e) {
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
