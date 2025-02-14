---
layout: default
title: Spotify Playlist to Gig Performer .gig file
description: Create skeleton Gig Performer Gig file from a Spotify playlist
gitrepo: https://github.com/musios-app/spotify-playlist-to-gigperformer
tags: spotify gig-performer utility script playlist
icon: assets/images/spotify-playlist-to-gigperformer-icon.svg
image: /projects/spotify-playlist-to-gigperformer/assets/images/og-spotify-playlist-to-gigperformer.svg
---



# Spotify Playlist to Gig Performer converter

Do you sort out your setlist in Spotify? This script generates a skeleton Gig Performer Gig file from a Spotify playlist. It's a timesaver if you've already built your rackspaces.

<div class="btn-tool">
  <a href="./tool">
    <img src="assets/images/spotify-playlist-to-gigperformer-icon.svg" style="max-width: 250px" alt="Spotify Playlist to Gig Performer converter icon"/>
    <br/>
    <span class="h4">Open the converter</span>
  </a>
</div>


<div style="border-left: 2px solid #808080; padding-left: 16px">
  Github: <a href="https://github.com/musios-app/spotify-playlist-to-gigperformer">https://github.com/musios-app/spotify-playlist-to-gigperformer</a>
  <br/>
  Licence: <a href="./LICENSE.txt">Creative Commons CC0 1.0 Universal</a>
  <br/>
  Author: Andrew Hunt (<a href="https://musios.app">https://musios.app</a>)
  <br/>
  Status: <span class="badge text-bg-warning">Beta</span>
</div>


## Overview

Do you sort out your setlist in Spotify? This script generates a skeleton Gig Performer Gig file from a Spotify playlist. It's a timesaver if you've already built your rackspaces.  The Gig file is sparse but contains:

* Set list with each song from the Spotify playlist
* Some metadata for the playlist in a comment in the Gig script
* Each song has the name and artist(s)
* GP defaults are used for tempo (120bpm), key (C major), time signature (4/4)
* Gig Performer 5 Gig file format

### Known Limitations & Issues

* The tool needs better notification if the Spotify API request fails
* Maximum of 100 tracks will be added to GP .gig file
* Some Spotify playlist IDs are not supported by the Spotify playlist API
* Unfortunately, in late 2024 Spotify withdrew it's "Feature" API which provided very useful information such as key, time signature, tempo, style and more. They say they will launch something new and better - who knows what or when. 

**This code is provided as-is. The structure for GP's Gig file, song file and other file formats are clear but not documented and they recommend not manipulating the XML files.**



## Implementation

### Spotify Developer App

This script makes calls to the [Spotify Web API](https://developer.spotify.com/documentation/web-api) to retrieve playlist and song information.

Follow the [Getting started](https://developer.spotify.com/documentation/web-api) instructions to [create an app](https://developer.spotify.com/documentation/web-api/concepts/apps).  Record the client ID and security key securely.


### GetPlaylist Spotify API Request 

`/assets/js/spotify-getplaylist.js` accepts a Spotify playlist ID (or a sharable URI).
It requests and returns the full details for that playlist using the [Get Playlist method](https://developer.spotify.com/documentation/web-api/reference/get-playlist)
of the [Spotify Web API](https://developer.spotify.com/documentation/web-api).

The playlist must be **public**.

This function can be run 
* Locally with `nodejs` (best for dev & test)
* As an AWS Lambda function
* In a browser (with limitations due to [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)).

Spotify API credentials must be set as environment variables.
To get API credentials, follow the guide on [Getting started with Spotify Web API](https://developer.spotify.com/documentation/web-api/tutorials/getting-started).

```bash
export SPOTIFY_CLIENT_ID="1b2a3**********************"
export SPOTIFY_CLIENT_KEY="4c5d6e**********************"
```

### AWS Deployment

Deploy to Lambda following [AWS instructions])(https://docs.aws.amazon.com/lambda/latest/dg/getting-started.html). 

* AWS account required with an admin user account
* Create a Lambda function
* Upload `/assets/js/spotify-getplaylist.js` as the code
* Add the Spotify credentials to the environment
* Test the function in the console
* Test externally with cURL:

```bash
**export LAMBDA_URL="https://hdu*************************hsdj.lambda-url.ap-southeast-2.on.aws"
curl --request POST "${LAMBDA_URL}" \
    --header "Content-Type: application/json" \
    --data '{ "playlistId": "4OnxXeH9iH0BD8Ri7qZy9y" }'
```


### Generating an XML Gig File (skeleton)

`/assets/js/spotify-playlist-to-gigfile.js` transforms the Spotify playlist data to an Gig Performer Gig file. The output Gig file:

* GP proprietary XML structure for the `.gig` file
* The format is for GP 5.x (not tested with GP 4.x or earlier)
* Gig file settings include:
  * Gig script has metadata from Spotify playlist
  * Default time signature: `4/4`
  * Default tempo / BPM: 120
  * Single setlist with all the songs from the playlist
* One song per track in the Spotify playlist
  * Song name and artist copied from the playlist
  * Default time signature: `4/4`
  * Default tempo / BPM: 120
  * Default key: C Major
  * Send PC disabled
  * No chords file
  * Single Song Part called "main"
  * Song script contains other song metadata including
    * Duration (seconds)
    * Album name, release date, artists, ID and sharable URL
    * Spotify data (track id and sharable URL)

### Web Site

The tool is a static website built with React, Bootstrap, SCSS, vite.

The process is roughly:

1. User pastes a Spotify playlist share URL
2. Parse and verify we can find a playlist ID
3. Request the playlist details from the AWS Lambda service
4. Lambda forwards the requests to the Spotify API
5. Upon valid playlist response, 
   1. Display a summary
   2. Display a table with all the tracks
   3. Show a Gig Performer summary and download button
6. When GP .gig button in clicked, generate the XML and download

```
# Run locally for development
npm run dev

# Build static version
npm run build
```


### Environment

Developed and tested with:

* Gig Performer 5.0.28
* MacOS Sequoia 15.2
* `node/NVM` version v23.4.0
* Browsers
  * Chrome Version 133.0.6943.54 (Official Build) (arm64)
  * Arc Version 1.81.0 (58533) on Chromium Engine Version 133.0.6943.54


### Roadmap Ideas

* Support a wider range of Spotify content: tracks, albums, Spotify-generated playlists
* Allow the track list to be edited
  * Reorder tracks
  * Checkboxes to select inclusions
  * Edit the BPM, time signature etc

<style>
  .btn-tool {
    margin: 24px 48px;
    text-align: center;
    padding: 12px 24px;
    width: fit-content;
    border: 2px solid  #1ed760;
    border-radius: 25px;
    background-color: #1ed76040;
  }
</style>
