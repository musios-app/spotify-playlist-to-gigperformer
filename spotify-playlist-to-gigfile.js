const path = require('path')
const url = require('url')


if (process.argv.length != 3) {
    console.error("ERROR: missing a Spotify playlist URL or playlist ID")
    console.error(`Syntax: node ${path.basename(process.argv[1])} <spotify-playlist-url>`)
    process.exit(1)
}

const playlistId = process.argv[2].startsWith("https://open.spotify.com")
    ? url.parse(process.argv[2], true).pathname.split('/').pop()
    : process.argv[2]


if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_KEY) {
    console.error("ERROR: Missing Spotify client ID or client secret in environment variables")
    process.exit(1)
}


function escapeXml(unsafe) {
    return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
}


function songXml(song) {
    const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

    return `

        <SONG
            songName="${escapeXml(song.track.name)}"
            songArtist="${escapeXml(song.track.artists.map(a => a.name).join(", "))}"
            overrideTime="1"
            bpm="120" 
            sigNum="4" 
            sigDen="4" 
            rootNote="C" 
            usesMinorKey="0"
            transpose="0" 
            backingTrack="" 
            uid="${genRanHex(22)}"
            locked="0" 
            sendPC="0" 
            pcToSend="0" 
            bankToSend="0" 
            songCordsLyrics=""
            scriptWindowPos="">

                <SONG_PART 
                    songPartName="main" 
                    overrideTime="0" 
                    bpm="120.0" 
                    sigNum="4" 
                    sigDen="4"    
                    rackspace="0" 
                    variation="0" 
                    midiOut="">
                </SONG_PART>

                <SCRIPT_CONTENT>
/*
  Spotify song data

  Duration: ${song.track.duration_ms / 1000}s

  Album: ${escapeXml(song.track.album.name)}
  Album release: ${escapeXml(song.track.album.release_date)}
  Album artists: ${escapeXml(song.track.album.artists.map(a => a.name).join(", "))}

  Track ID: ${escapeXml(song.track.id)}
  Track URL: ${escapeXml(song.track.href)}

  Album ID: ${escapeXml(song.track.album.id)}
  Album URL: ${escapeXml(song.track.album.href)}
*/
                </SCRIPT_CONTENT>

        </SONG>
    `
}


function gigXml(playlist) {

    const songs = playlist.tracks.items.map(songXml).join("\n")

    return `<?xml version="1.0" encoding="UTF-8"?>

<GIGRACK activeRackSpace="0" gbpm="120.0" gtimeNum="7" gtimeDen="4" gTranspose="0" version="5.0" scriptWindowPos="" globalStereoCount="2" globalPanelVisible="0">
    <SCRIPT_CONTENT>
/*
  Spotify playlist data

  Playlist name: ${playlist.name}
  ID: ${playlist.id}
  URL: ${playlist.external_urls.spotify}
*/
    </SCRIPT_CONTENT>

    <SETLISTS activeSetlist="0">
        ${songs}
    </SETLISTS>
</GIGRACK>`
}



fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_KEY).toString('base64'))
        },
        body: "grant_type=client_credentials",
        json: true
    })
    .then(response => response.json())
    .then(data => 
        fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            headers: {
                'Authorization': `Bearer ${data.access_token}`
            }
        }))
    .then(response => response.json())
    .then(data => {
        // Data is the full playlist object

        // console.log(JSON.stringify(data, null, 2))
        // console.log(songXml(data.tracks.items[0]))
        console.log(gigXml(data))
    })
    .catch(error => {
        console.error('Error:', error)
    })
