import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {name: 'New Noise',
        artist: 'The Refused',
        album: 'The Shape of Punk to Come'},
        {name: 'Hands Down',
        artist: 'Dashboard Confessional',
        album: 'A Mark, a Mission, a Brand, a Scar'},
        {name: 'name',
        artist: 'artist',
        album: 'album'}
      ]
    };
  }


  render() {
    console.log(this.state.searchResults);
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
        <SearchBar />
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults}/>
          <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
