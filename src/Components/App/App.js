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
      ],
      playlistName: 'New Playlist',
      playlistTracks: [
        {name: 'Formed a Band',
        artist: 'Art Brut',
        album: 'Bang, Bang, Rock and Roll'},
        {name: 'Poison Oak',
        artist: 'Bright Eyes',
        album: "I'm Wide Awake, It's Morning"}
      ],
      resultsRemoval: false,
      playlistRemoval: true
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  addTrack(track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.concat([track])
    })
  }

  removeTrack(track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.splice(track.id,1)
    })
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  savePlaylist() {
    let trackURIs = []
    console.log(trackURIs);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
        <SearchBar />
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
