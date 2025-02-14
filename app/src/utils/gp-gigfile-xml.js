
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

    console.log(song)

    return `

        <SONG
            songName="${escapeXml(song.track.name)}"
            songArtist="${escapeXml(song.track.artists.map(artist => artist.name).join(", "))}"
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

  Duration: ${(song.track.duration_ms / 1000).toFixed(1)} (sec)

  Album: ${escapeXml(song.track.album.name)}
  Album release: ${escapeXml(song.track.album.release_date)}
  Album artists: ${escapeXml(song.track.album.artists.map(artist => artist.name).join(", "))}

  Track ID: ${escapeXml(song.track.id)}
  Track URL: ${escapeXml(song.track.external_urls.spotify)}
*/
                </SCRIPT_CONTENT>

        </SONG>
    `
}


export function gigXml(playlist) {
    console.log(playlist)
    
    const songs = playlist.tracks.items.map(songXml).join("\n")

    return `<?xml version="1.0" encoding="UTF-8"?>

<GIGRACK activeRackSpace="0" gbpm="120.0" gtimeNum="7" gtimeDen="4" gTranspose="0" version="5.0" scriptWindowPos="" globalStereoCount="2" globalPanelVisible="0">
    <SCRIPT_CONTENT>
/*
  Spotify playlist data

  Playlist name: ${playlist.name}
  Owner: ${playlist.owner.display_name}
  URL: ${playlist.external_urls.spotify}
  ID: ${playlist.id}
*/
    </SCRIPT_CONTENT>

    <SETLISTS activeSetlist="0">
        ${songs}
    </SETLISTS>
</GIGRACK>`
}
