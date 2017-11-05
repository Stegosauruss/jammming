import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify';
const debug = false;

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
    //moves tracks from SearchResults to playlistTracks state.
    if(!this.state.playlistTracks.some(pTrack => pTrack.id === track.id)) {
      this.setState({
        playlistTracks: this.state.playlistTracks.concat([track])
      })
    }
  }

  removeTrack(track) {
    //removes Tracks from playlistTracks state.
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(ptrack => ptrack.id !== track.id)
    })
  }

  updatePlaylistName(name) {
    //method to save playlist name to state.
    this.setState({
      playlistName: name
    })
  }

  savePlaylist() {
    //method for saving playlist to Spotify API.
    let trackURIs = []
    this.state.playlistTracks.forEach(track => {
      trackURIs.push(track.uri);
    })
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
  }

  search(term) {
    //calls Spotify.search to return a new array for searchResults state.
    Spotify.search(term).then(tracks => {
      this.setState({searchResults: tracks})
    })
  }

  render() {
    if (debug) {
      //console logs when debugging
      console.log(this.state.playlistName);
      console.log(this.state.playlistTracks);
      console.log(this.state.searchResults);
      console.log(Spotify);
    }
    return (
      //rendering components
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
