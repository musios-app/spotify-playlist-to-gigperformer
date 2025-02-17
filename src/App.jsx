import * as React from 'react'
import musiosLogo from './assets/images/musios-logo-black-circle.svg'
import PlaylistForm from './PlaylistForm'
import PlaylistSummary from './PlaylistSummary'
import PlaylistTracks from './PlaylistTracks'
import GigFile from './GigFile'

function App() {
  const [playlistData, setPlaylistData] = React.useState('')
  const [showWarning, setShowWarning] = React.useState(false)
  
  const handlePlaylistData = (data) => {
    console.log(data)
    if (!data) {
      setShowWarning(false)
      setPlaylistData(null)
    }
    else if (typeof data === 'object' && data.error) {
      setShowWarning(true)
      setPlaylistData(null)
    } else {
      setShowWarning(false)
      setPlaylistData(data)
    }
  }

  return (
    <>
      <div className="container align-items-start text-center w-100">

        <div className="container" style={{border: "1px solid #404060", borderRadius: "12px", backgroundColor: "#f0f0f8", padding: "16px 24px", marginBottom: "32px", }}>

          <div className="row" style={{margin: "0px 0px 20px 0px"}}>
            <h1 className="mb-0">
              <img src={musiosLogo} alt="Musios Logo" className="logo" style={{display: "inline", maxHeight: "60px", paddingRight: "30px"}}/>
              Spotify Playlist to Gig Performer .gig file
            </h1>
          </div>

          <div className="row text-left w-100">

            <div className="col-8 text-start">
              Spotify&apos;s limitations:
                <li>Spotify only allows access to <b>public</b> playlists</li>
                <li>Spotify only allows access to playlists <b>owned by a user</b></li>
                <li>Spotify does not return info on Spotify-curated lists</li>
            </div>

            <div className="col-4 text-start">
              <p style={{margin: "0 10px"}}>
                App by <a href="https://musios.app">Musios.app</a>
              </p> 
              <p style={{margin: "0 10px"}}>
                <a href="https://musios.app/projects/spotify-playlist-to-gigperformer/README.html"> Documentation </a>
              </p>
              <p style={{margin: "0 10px"}}>
                <a href="https://github.com/musios-app/spotify-playlist-to-gigperformer"> GitHub </a>
              </p>
              <p style={{margin: "0 10px"}}>
                <a href="https://github.com/orgs/musios-app/discussions"> Comments & Support </a>
              </p>
            </div>

          </div>
          
        </div>


        <div className="row my-4" style={{display: "none"}}>
          https://open.spotify.com/playlist/3cEYpjA9oz9GiPac4AsH4n
          <br/>
          https://open.spotify.com/playlist/5VFMzO8Co4F6BBc0NdzKPT?si=d96e6f27059b40e9 (dead wax)
        </div>
      </div>        

      <div className="container my-4 w-100">
        <GigFile playlistData={playlistData} />
      </div>

      <div className="container my-4 w-100">
        <PlaylistForm playlistCallback={handlePlaylistData} />
      </div>


      {showWarning && (
          <div className="container my-4 w-100 text-start p-3" style={{border: "1px solid #b08080", backgroundColor: "#f8e0e0", borderRadius: "6px"}}>
            <b>Error: no playlist data available</b>
            <br/>
            Check that this link (a) is a valid playlist, (b) is public, and (c) is owned by a user and is not a Spotify-generated list.
            <br/>
            The simplest way is to paste the URL into the Spotify search bar.
          </div>
      )}

      {playlistData && (
        <>
          <div className="container my-4 w-100">
            <PlaylistSummary playlistData={playlistData}/>
          </div>

          <div className="container my-4 w-100">
            <PlaylistTracks playlistData={playlistData}/>
          </div>
        </>
      )}
    </>
  )
}

export default App
