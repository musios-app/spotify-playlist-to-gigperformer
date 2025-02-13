import * as React from 'react'
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
        <div className="row">
          <h1 className="mb-0">Spotify Playlist to Gig Performer .gig file</h1>
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
