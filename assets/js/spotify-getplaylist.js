// AWS Lambda function to retrieve information about a Spotify playlist from Spotify API
// https://developer.spotify.com/documentation/web-api/reference/get-playlist

class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
    }
}

function getPlaylist(playlistId) {
    const tokenApiUrl = 'https://accounts.spotify.com/api/token'
    const tokenData = {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_KEY).toString('base64'))
        },
        body: "grant_type=client_credentials",
        json: true
    }
    
    return fetch(tokenApiUrl, tokenData)
        .then(response => {
            if (!response.ok) {
                throw new AppError('Failed to get authorization token: ' + response.statusText, response.status)
            }
            console.debug(`authorized`)
            return response.json();
        })
        .then(token => {
            // const params = new URLSearchParams({ fields: 'description,uri,items' })
            // const playlistApiUrl = `https://api.spotify.com/v1/playlists/${playlistId}?${params}`
            const playlistApiUrl = `https://api.spotify.com/v1/playlists/${playlistId}`
            const playlistData = {
                method: 'GET',
                json: true,
                headers: {
                    'Authorization': `Bearer ${token.access_token}`
                }
            }
            return fetch(playlistApiUrl, playlistData)
        })
        .then(response => {
            if (!response.ok) {
                throw new AppError('Failed to get Spotify playlist data: ' + response.statusText, response.status)
            }
            console.debug(`received playlist data`)
            return response.json();
        })
        .then(playlistInfo => {
            if (Object.keys(playlistInfo).length === 0 ) {
                throw new AppError('empty JSON responseplaylist data', 400)
            }

            playlistInfo.tracks.items.forEach(item => {
                item.track.available_markets = null
                if (item.track.album && item.track.album.available_markets) item.track.album.available_markets = null
            })

            console.debug(`num tracks: ${playlistInfo.tracks.items.length}`)
            // console.debug(JSON.stringify(playlistInfo,null,2))
            console.debug(`JSON length: (${JSON.stringify(playlistInfo,null,2).length}) chars`)

            return playlistInfo
        })
        .catch(error => {
            return {
                statusCode: error.statusCode || 500,
                body: JSON.stringify({ error: error.message})
            };
        });
}

export const handler = async (event, context) => {
    // console.debug("handler event:", JSON.stringify(event, null, 2))
    const playlistId = event.body 
        ? JSON.parse(event.body).playlistId
        : event.playlistId
    console.debug(`request playlistId: ${playlistId}`)
    return getPlaylist(playlistId)
}

// Test case
if (false) {
    handler({ body: JSON.stringify({ playlistId: '3cEYpjA9oz9GiPac4AsH4n' }) }, null)
        .then(data => console.log(data))
        .catch(error => console.error(error))
}
