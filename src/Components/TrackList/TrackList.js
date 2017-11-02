import React from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';

class TrackList extends React.Component {
  //passes down search results to return a list of tracks.
  render() {
    return (
      <div className="TrackList">
        {
        this.props.tracks.map(track =>
          <Track track={track}
          key={track.id}/>
          )
        }
      </div>
    )
  }
}

export default TrackList;
