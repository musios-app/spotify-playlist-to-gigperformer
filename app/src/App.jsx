import * as React from 'react'
import musiosLogo from './assets/images/musios-logo-black-circle.svg'
// import projectLogo from './assets/images/spotify-playlist-to-gigperformer-icon.svg'
import PlaylistForm from './PlaylistForm'
import PlaylistSummary from './PlaylistSummary'
import PlaylistTracks from './PlaylistTracks'
import GigFile from './GigFile'

function App() {
    const [playlistData, setPlaylistData] = React.useState('')
  
  const handlePlaylistData = (data) => {
    setPlaylistData(data)
  }

  return (
    <>
      <div className="container align-items-start text-center w-100">

        <div className="" style={{border: "1px solid #404050", borderRadius: "12px", backgroundColor: "#e0e0e0", padding: "16px 24px", marginBottom: "32px", }}>

          <div className="row">
            <h1 className="mb-0">
              <img src={musiosLogo} alt="Musios Logo" className="logo" style={{display: "inline", maxHeight: "80px", paddingRight: "30px"}}/>
              Spotify Playlist to Gig Performer .gig file
            </h1>
          </div>


          <span style={{margin: "0 10px"}}>
            by <a href="https://musios.app">Musios.app</a>
          </span>
          | 
          <span style={{margin: "0 10px"}}>
            <a href="https://musios.app/projects/spotify-playlist-to-gigperformer/README.html"> Documentation </a>
          </span>
          | 
          <span style={{margin: "0 10px"}}>
            <a href="https://github.com/musios-app/spotify-playlist-to-gigperformer"> GitHub </a>
          </span>
          | 
          <span style={{margin: "0 10px"}}>
            <a href="https://github.com/orgs/musios-app/discussions"> Comments & Support </a>
          </span>
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

      <div className="container my-4 w-100">
        <PlaylistSummary playlistData={playlistData}/>
      </div>

      <div className="container my-4 w-100">
        <PlaylistTracks playlistData={playlistData}/>
      </div>
    </>
  )
}

export default App
