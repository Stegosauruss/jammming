import React from 'react';
import './Track.css';

class Track extends React.Component {
  //renders each individual track passed down from TrackList
  renderAction() {
    if (this.isRemoval === true) {
      return <a>-</a>;
    }
    else {
      return <a>+</a>;
    }
  }


  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3> {this.props.track.name} </h3>
          <p> {this.props.track.artist} | {this.props.track.album} </p>
        </div>
        <a className="Track-action">{this.renderAction()}</a>
      </div>
    )
  }
}

export default Track;
