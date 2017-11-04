import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList.js';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    const name = e.target.value;
    this.props.onNameChange(name);
  }


  render() {
    return (
      <div className="Playlist">
        <input
        onChange={this.handleNameChange}
        defaultValue={'New Playlist'}/>
        <TrackList
        tracks={this.props.playlistTracks}
        isRemoval={this.props.isRemoval}
        onRemove={this.props.onRemove}/>
        <a 
        className="Playlist-save"
        onClick={this.props.onSave}
        >
        SAVE TO SPOTIFY
        </a>
      </div>
  )
}
}

export default Playlist;
