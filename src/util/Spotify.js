const clientID = 'e3a0313934cb4e6d88c96fb22bff6229';
const secret = '55b20313b6514e43bea89c2be12c4721';
const redirectURI = 'http://localhost:3000/'


const Spotify = {
  //methods relating to Spotify API.
  accessToken: '',

  getAccessToken() {
    //accesses Spotify API returning an access token.
    if (this.accessToken) {
      return this.accessToken;
    }

    const newAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const expireMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (newAccessToken && expireMatch) {
      this.accessToken = newAccessToken[1];
      const expiresIn = Number(expireMatch[1]);
      window.setTimeout(() => this.accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return this.accessToken;
    }

    else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  search(term) {
    // accesses Spotify api returning a list of tracks based on search term.
    this.accessToken = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: 'Bearer ' + this.accessToken
        }
      }
    ).then(response => {
        return response.json();
      }
    ).then(
      jsonResponse => {
        if (jsonResponse.tracks) {
          return jsonResponse.tracks.items.map(track => (
            {
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              id: track.id,
              uri: track.uri
            })
          );
        }
      });
  },

  savePlaylist(name, trackURIs) {
    //saves the playlist generated in app to the users Spotify account.
    if (!name || !trackURIs) {
      return
    }
    else {
      this.accessToken = this.getAccessToken();
      const headers = {
        Authorization: `Bearer ` + this.accessToken
      };
      let userId;
      let playlistId;

      return fetch('https://api.spotify.com/v1/me', {headers: headers}
      ).then(response => {
        return response.json();
        }
      ).then(
        jsonResponse => {
          userId = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({name: name})
            }
          )
        }
      ).then(
        response => response.json()
      ).then(jsonResponse => {
        playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackURIs})
        })
      })
    }
  }
}

export default Spotify;
