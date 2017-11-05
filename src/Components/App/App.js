import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
      resultsRemoval: false,
      playlistRemoval: true
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if(!this.state.playlistTracks.some(pTrack => pTrack.id === track.id)) {
      this.setState({
        playlistTracks: this.state.playlistTracks.concat([track])
      })
    }
  }

  removeTrack(track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(ptrack => ptrack.id !== track.id)
    })
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  savePlaylist() {
    let trackURIs = []
    this.state.playlistTracks.forEach(track => {
      trackURIs.push(track.uri);
    })
    Spotify.savePlaylist(this.state.playlistName, this.state.playlistTracks);
  }

  search(term) {
    console.log(term);
    return Spotify.search(term).then(results => {
      this.setState(this.searchResults: results)
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
        <SearchBar
        onSearch={this.search}
        />
          <div className="App-playlist">
            <SearchResults
            searchResults={this.state.searchResults}
            onAdd={this.addTrack}
            isRemoval={this.state.resultsRemoval}
            />
            <Playlist
            playlistTracks={this.state.playlistTracks}
            playlistName={this.state.playlistName}
            onNameChange={this.updatePlaylistName}
            isRemoval={this.state.playlistRemoval}
            onRemove={this.removeTrack}
            onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
