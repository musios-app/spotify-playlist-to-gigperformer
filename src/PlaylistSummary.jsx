// import faSpotify from './assets/images/fa-spotify-white.svg'
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types'

import gigPerformerLogo from './assets/images/gig-performer-icon-512x512.jpg'

import faRightFromSquare from './assets/images/fa-up-right-from-square.svg'
// import faSpinner from './assets/images/fa-spinner-white.svg'
import faRightToBracket from './assets/images/fa-right-to-bracket.svg'
import faDownload from './assets/images/fa-download-white.svg'

PlaylistSummary.propTypes = {
  playlistData: PropTypes.object.isRequired
}


function PlaylistSummary(props) {
  
  const data = props.playlistData

  if (!data) {
    return null
  }


  function downloadContent(content, contentType, filename) {
    const blob = new Blob([content], { type: contentType });

    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


  function downloadGigFile() {
    downloadContent(JSON.stringify(data), 'application/json', `${data.name}.json`)
  }

  const totalTimeMs = data.tracks.items.reduce((sum, item) => sum + item.track.duration_ms, 0)
  const totalTimeSec = (totalTimeMs / 1000).toFixed(1)

  return (
    <>
      <div className="row step-row w-100">
        <div className="col-2">
          <img src={gigPerformerLogo} alt="Gig Performer logo" className="step-icon"  style={{display: "none"}}/>
        </div>

        <div className="col-8 text-start playlist-summary">
          <img src={faRightToBracket} alt="progress arrow" className="progress-arrow fa-button" />

          <img src={data.images[0].url} alt="Playlist cover" className="playlist-cover" style={{float: "right", maxHeight: "120px"}}/>

          <h2 className="h4">
              {data.name} 
              <a href={data.external_urls.spotify} target="_blank">
                <img src={faRightFromSquare} alt="Spotify web link" className="fa mx-2" />
              </a>
            </h2>

            <div className="p fst-italic mt-2">{data.description}</div>
            <div className="p">{data.tracks.total} tracks </div>
            <div className="p">Total time: {totalTimeSec} sec </div>
            <div className="p">Owner: <a href={data.owner.external_urls.spotify}>{data.owner.display_name}</a></div>
        </div>

        <div className="col-2">
          <Button className="btnGigFileDownload no-break" variant="primary" disabled={!data} onClick={downloadGigFile}  style={{display: "none"}}>
            <div className='p no-wrap'>
              <img src={faDownload} alt="Spotify web link" className="fa-button px-1" />
              <span className="px-1">Gig File</span>
            </div>
          </Button>
        </div>
      </div>
    </>
  )

  /*
  return (
    <>
      <div className="container text-center">
        <div className="row justify-content-md-center">
          <div className="col-md-auto text-start mt-5" style={{maxWidth: "fit-content"}}>
            <img src={data.images[0].url} alt="Playlist cover" className="playlist-cover mt-3" style={{maxHeight: "160px"}}/>
          </div>

          <div className="col-md-auto text-start ms-4">
            <div className="p fit-content">
              <Button className="btnSpotifyLoad px-4 no-break" variant="primary" disabled={!data} onClick={downloadGigFile}>
                <img src={faDownload} alt="Spotify web link" className="fa px-2" />
                Download Gig File
              </Button>
            </div>

            <h2 className="h3 mt-3">
              {data.name} 
              <a href={data.external_urls.spotify} target="_blank">
                <img src={faRightFromSquare} alt="Spotify web link" className="fa mx-2" />
              </a>
            </h2>

            <div className="p fst-italic mt-4">{data.description}</div>
            <div className="p">{data.tracks.total} tracks </div>
            <div className="p">Total time: {totalTimeSec} sec </div>
            <div className="p">Owner: <a href={data.owner.external_urls.spotify}>{data.owner.display_name}</a></div>
          </div>
        </div>
      </div>
    </>
  )
  */
}

export default PlaylistSummary

