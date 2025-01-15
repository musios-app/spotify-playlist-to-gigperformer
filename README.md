---
layout: default
title: Spotify Playlist to Gig Performer
description: Tool to generate a skeleton Gig Performer Gig file from a Spotify playlist
gitrepo: https://github.com/musios-app/spotify-playlist-to-gigperformer
tags: spotify gig-performer utility script playlist
image: assets/images/spotify-icon.svg
---

# Spotify Playlist to Gig Performer converter

The script generates a skeleton Gig Performer Gig file from a Spotify playlist. After negtoation a songlist with the bandmates, it makes the process of getting a GP rig going easier.

The Gig file contains:

* Set list with each song from the Spotify playlist (to a max of 100 tracks)
* Some metadata for the playlist in a comment in the Gig script
* Each song has the name and artist(s)
* GP defaults are used for tempo (120bpm), key (C major), time signature (4/4)
* Gig Performer 5 format

Unfortunately, in late 2024 Spotify withdrew a "feature" API which contained very useful information such as key, time signature, tempo, style and more. They say they will launch something new and better - who knows! 

**This code is provided as-is because, although the Gig file, song file and other GP file formats are well-structured they are not documented.**

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

**Step 4**: From a MacOS terminal

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

**Step 5**: Open the Gig file in Gig Performer
