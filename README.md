# spotify-playlist-to-gigperformer

Generate a skeleton Gig Performer Gig File from a Spotify playlist.

## Environment

This version was tested with `node/NVM` version v23.4.0 on MacOS Sequoia 15.2. 

## Spotify Developer API Used

This script makes calls to the [Spotify Web API](https://developer.spotify.com/documentation/web-api) to retrieve playlist and song information.

Follow the [Getting started](https://developer.spotify.com/documentation/web-api) instructions to [create an app](https://developer.spotify.com/documentation/web-api/concepts/apps). Securely record your client ID and security key.


## Usage

**Step 1**: Download [spotify-playlist-to-gigfile.js](https://raw.githubusercontent.com/andrewjhunt/spotify-playlist-to-gigperformer/refs/heads/main/scripts/spotify-playlist-to-gigfile.js?token=GHSAT0AAAAAAC5BQWVQIXWSLFRZM24QJXIGZ4HLEMQ) by following the `scripts` link above.

**Step 2**: Copy the sharable URL for your Spotify playlist.

**Step 3**: from the playlist use "..." then Share and "Copy link to Playlist". It will look something like this.

`https://open.spotify.com/playlist/3Nl234a23rqsA8M6kCUNxi?si=9d3256cad99fca66`

Step 3: From a MacOS terminal

```bash
# Spotify API credentials
export SPOTIFY_CLIENT_ID="1b2a3**********************"
export SPOTIFY_CLIENT_KEY="4c5d6e**********************"

# Run the script
node spotify-playlist-to-gigfile.js '<playlist-url>' > playlist.gig
```

**Step 4**: Open the Gig file in Gig Performer
