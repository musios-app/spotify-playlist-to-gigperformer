---
layout: default
title: Spotify Playlist to Gig Performer .gig file
description: Tool to generate a skeleton Gig Performer Gig file from a Spotify playlist
gitrepo: https://github.com/musios-app/spotify-playlist-to-gigperformer
tags: spotify gig-performer utility script playlist
icon: assets/images/spotify-playlist-to-gigperformer-icon.svg
image: /projects/spotify-playlist-to-gigperformer/assets/images/og-spotify-playlist-to-gigperformer.svg
---


# Spotify Playlist to Gig Performer converter

Github: [https://github.com/musios-app/spotify-playlist-to-gigperformer](https://github.com/musios-app/spotify-playlist-to-gigperformer)
<br/>
Licence: [Creative Commons CC0 1.0 Universal](LICENSE.txt)
<br/>
Author: Andrew Hunt ([musios.app](https://musios.app))
<br/>
Status: <span class="badge text-bg-warning">Prototype</span>


<div class="image-wrapper row justify-content-center">
    <a href="assets/images/spotify-playlist-to-gigperformer-icon.svg" data-toggle="lightbox" data-gallery="example-gallery">
        <img src="assets/images/spotify-playlist-to-gigperformer-icon.svg" class="img-fluid maxh-300" style="max-width: 250px" alt="Spotify Playlist to Gig Performer converter icon"/>
    </a>
</div>


## Overview

Do you sort out your setlist in Spotify? This script generates a skeleton Gig Performer Gig file from a Spotify playlist. It's a timesaver if you've already built your rackspaces.  The Gig file is sparse but contains:

* Set list with each song from the Spotify playlist (to a max of 100 tracks)
* Some metadata for the playlist in a comment in the Gig script
* Each song has the name and artist(s)
* GP defaults are used for tempo (120bpm), key (C major), time signature (4/4)
* Gig Performer 5 Gig file format

**This code is provided as-is. The structure for GP's Gig file, song file and other file formats are clear but not documented and they recommend not manipulating the XML files.**

**Notes**

* This is a development version as a step towards an easier-to-use web page. It requires some development skills to use. If you can run `node` from a terminal then you're ok
* You'll need to get Spotify API credentials (summary below). This won't be needed in a web version.

Unfortunately, in late 2024 Spotify withdrew it's "Feature" API which contained very useful information such as key, time signature, tempo, style and more. They say they will launch something new and better - who knows what or when. 



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
export LAMBDA_URL="  https://hdu*************************hsdj.lambda-url.ap-southeast-2.on.aws"
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


### Environment

Developed and tested with:

* Gig Performer 5.0.28
* MacOS Sequoia 15.2
* `node/NVM` version v23.4.0
* Browsers
  * Chrome Version 133.0.6943.54 (Official Build) (arm64)
  * Arc Version 1.81.0 (58533) on Chromium Engine Version 133.0.6943.54


## Roadmap

To make everything simpler, this should be a web page with the same functionality. The rough idea is 

* User pastes the URL for the Spotify playlist into the page
* The page retrieves the playlist data
  * Will need a Lambda service or similar because of CORS
  * Will only work for public playlists
* Web page creates the XML Gig file with a Download button
* The page will not collect the users's setlist data
* Extensions
  * present the setlist as a table with a CSV or Excel download
  * add other music sources
