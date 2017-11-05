const clientID = 'e3a0313934cb4e6d88c96fb22bff6229';
const secret = '55b20313b6514e43bea89c2be12c4721';
const redirectURI = 'http://localhost:3000/'
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const newAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const expireMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (newAccessToken && expireMatch) {
      accessToken = newAccessToken[1];
      const expiresIn = Number(accessToken);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    }

    else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  search(term) {
    accessToken = Spotify.getAccessToken;
    console.log(accessToken);
    () => {
      return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
        }
      }
    ).then(response => {
        return response.json();
      }
    ).then(
      jsonResponse => {
        if (jsonResponse.tracks) {
          return jsonResponse.tracks.items.map(track =>
            {
              name: track.name
              artist: track.artists[0].name
              album: track.album.name
              id: track.id
              uri: track.uri
            }
          );
        }
      });
    }
  },

  savePlaylist(name, trackURIs) {
    if (!name || !trackURIs) {
      return
    }
    else {
      const accessToken = this.getAccessToken();
      const headers = {
        Authorization: `Bearer ${accessToken}`
      };
      let userId;

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
        const playlistID = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackURIs})
        })
      })
    }
  }
}

export default Spotify;
