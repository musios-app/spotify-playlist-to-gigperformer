---
layout: default
title: Spotify Playlist to Gig Performer
description: Tool to generate a skeleton Gig Performer Gig file from a Spotify playlist
gitrepo: https://github.com/musios-app/spotify-playlist-to-gigperformer
tags: spotify gig-performer utility script playlist
icon: assets/images/spotify-icon.svg
image: /projects/spotify-playlist-to-gigperformer/assets/images/og-spotify-playlist-to-gigperformer.svg
---

# Spotify Playlist to Gig Performer converter

<div class="alert alert-danger" role="alert">
    NOTE: this is a development version as a step towards an easy-to-use web page. 
    You'll be fine if you can run `node` from a terminal and able to get Spotify API credentials.
</div>

Do you work out a setlist on Spotify? This script generates a skeleton Gig Performer Gig file from a Spotify playlist. It's a timesaver if you've built a set of rackspaces.  The Gig file is sparse but contains:

* Set list with each song from the Spotify playlist (to a max of 100 tracks)
* Some metadata for the playlist in a comment in the Gig script
* Each song has the name and artist(s)
* GP defaults are used for tempo (120bpm), key (C major), time signature (4/4)
* Gig Performer 5 format

Unfortunately, in late 2024 Spotify withdrew it's "Feature" API which contained very useful information such as key, time signature, tempo, style and more. They say they will launch something new and better - who knows what or when. 

**This code is provided as-is. The structure for GP's Gig file, song file and other file formats are clear but not documented and they recommend not manipulating the XML files.**

## Environment

This version was developed at tested with:

* Gig Performer 5.0.28
* MacOS Sequoia 15.2
* `node/NVM` version v23.4.0

## Spotify Developer API Used

This script makes calls to the [Spotify Web API](https://developer.spotify.com/documentation/web-api) to retrieve playlist and song information.

Follow the [Getting started](https://developer.spotify.com/documentation/web-api) instructions to [create an app](https://developer.spotify.com/documentation/web-api/concepts/apps). Securely record your client ID and security key.


## Usage

**Step 1**: Download [spotify-playlist-to-gigfile.js](https://raw.githubusercontent.com/andrewjhunt/spotify-playlist-to-gigperformer/refs/heads/main/scripts/spotify-playlist-to-gigfile.js?token=GHSAT0AAAAAAC5BQWVQIXWSLFRZM24QJXIGZ4HLEMQ) by following the `scripts` link above.

**Step 2**: Copy the sharable URL for your Spotify playlist. From the playlist use "..." then Share and "Copy link to Playlist". It will look something like this.

`https://open.spotify.com/playlist/3Nl234a23rqsA8M6kCUNxi?si=9d3256cad99fca66`

**Step 3**: From a MacOS terminal

```bash
# Spotify API credentials
export SPOTIFY_CLIENT_ID="1b2a3**********************"
export SPOTIFY_CLIENT_KEY="4c5d6e**********************"

# Run the script
node spotify-playlist-to-gigfile.js '<playlist-url>' > playlist.gig
```

notes:

* You can change the output (`playlist.gig`) to a better filename like `best rock show of 2025.gig`
* The single quotes around the URL are required for the standard Spotify URL (because of shell completion chars)

**Step 4**: Open the Gig file in Gig Performer and build it out with your rackspaces.


## Notes on a web version

To make everything simpler, create a web page with the same functionality. The rough idea is 

* User pastes the URL for the Spotify playlist into the page
* The page retrieves the playlist data
  * Will need a Lambda service or similar because of CORS
  * Will only work for public playlists
* Web page creates the XML Gig file with a Download button
* Might also present the setlist as a table wit a CSV or Excel download
* The page will not collect the users's setlist data
