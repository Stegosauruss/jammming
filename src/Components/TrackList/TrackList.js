import React from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';

class TrackList extends React.Component {
  //passes down search results to return a list of tracks.
  render() {
    console.log(this.props.tracks)
    return (
      <div className="TrackList">
        {
        this.props.tracks.map(track =>
          <Track
          track={track}
          onAdd={this.props.onAdd}
          onRemove={this.props.onRemove}
          key={track.id}
          isRemoval={this.props.isRemoval}
          />
          )
        }
      </div>
    )
  }
}

export default TrackList;
