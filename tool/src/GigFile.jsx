// import faSpotify from './assets/images/fa-spotify-white.svg'
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types'

import gigPerformerLogo from './assets/images/gig-performer-icon-512x512.jpg'

// import faRightFromSquare from './assets/images/fa-up-right-from-square.svg'
// import faSpinner from './assets/images/fa-spinner-white.svg'
// import faRightToBracket from './assets/images/fa-right-to-bracket.svg'
import faDownload from './assets/images/fa-download-white.svg'

import { gigXml } from './utils/gp-gigfile-xml.js'

GigFile.propTypes = {
  playlistData: PropTypes.object.isRequired
}


function GigFile(props) {
  
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
    downloadContent(gigXml(data), 'application/xml', `playlist.gig`)
  }

  // const totalTimeMs = data.tracks.items.reduce((sum, item) => sum + item.track.duration_ms, 0)
  // const totalTimeSec = (totalTimeMs / 1000).toFixed(1)

  return (
    <>
      <div className="row step-row w-100">
        <div className="col-2">
          <img src={gigPerformerLogo} alt="Gig Performer logo" className="step-icon"/>
        </div>

        <div className="col-8 text-start gig-file-summary">
          <h2 className="h4">
          Your <code>.gig</code> file is ready
          </h2>
          
          <p>
            Notes
            <br/>
            &bull; Review the summary and full track list below
            <br/>
            &bull; If you update the playlist in Spotify then click &quot;Load&quot; to refresh the data
            <br/>
            &bull; This tool is provided as-is. Use at your own risk
            <br/>
            &bull; Gig Performer does not document their XML file formats or recommend tools like this
            <br/>
            &bull; The download is based on GP 5.x  <code>.gig</code> files and tested on GP 5.0.28
          </p>
        </div>

        <div className="col-2">
          <Button className="btnGigFileDownload no-break" variant="primary" disabled={!data} onClick={downloadGigFile}>
            <div className='p no-wrap'>
              <img src={faDownload} alt="Spotify web link" className="fa-button px-1" />
              <span className="px-1">Gig File</span>
            </div>
          </Button>
        </div>
      </div>
    </>
  )
}

export default GigFile

