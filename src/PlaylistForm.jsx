import * as React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types'
import faSpinner from './assets/images/fa-spinner-white.svg'
import faRightToBracket from './assets/images/fa-right-to-bracket-white.svg'
import spotifyLogo from './assets/images/spotify-icon.svg'

PlaylistForm.propTypes = {
  playlistCallback: PropTypes.func.isRequired,
}


// function get


function PlaylistForm(props) {
  const [spotifyId, setSpotifyId] = React.useState('')
  const [isLoading, setIsLoading] = React.useState('')

  const handleInputChange = (event) => {
    const { value } = event.target

    setSpotifyId(null)

    if (value.length === 22) {
      setSpotifyId(value)
    }
    else {
      try {
        const urlObj = new URL(value)
        const pathParts = urlObj.pathname.split('/')

        if (pathParts.length >= 3 && pathParts[1] === 'playlist') {
          setSpotifyId(pathParts[2])
        }
      } catch (error) {
        // ignore invalid URL
        error
      }
    }

    return event
  }

  function getPlaylistData() {
    setIsLoading(true)

    props.playlistCallback(null)

    const lambdaPlaylistUri = 'https://huguafaiimwtlamiw3ukyu647e0cvkhj.lambda-url.ap-southeast-2.on.aws'
    const funcData = {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playlistId: spotifyId })
    }

    fetch(lambdaPlaylistUri, funcData)
      .then(response => {
        if (!response.ok) {
          console.error(response)
          throw new Error(`Get playlist failed [${response.status}]: ${response.statusText}`);
        }
        return response.json()
      })
      .then(data => {
        // console.log(data)
        props.playlistCallback(data)
      })
      .catch(error => {
        console.error('Error:', error);
      })
      .finally(() => {
        setIsLoading(false)
      })
  }


  return (
    <>
      <div className="row step-row w-100">

        <div className="col-2">
          <img src={spotifyLogo} alt="Spotify logo" className="step-icon" />
        </div>

        <div className="col-8 text-start px-0">
          <Form.Group className="inputPlaylist">
            <Form.Control
              type="text"
              className={spotifyId ? 'valid-spotify-id' : ''}
              placeholder="Paste a Spotify playlist link..."
              onChange={handleInputChange}
            />
          </Form.Group>
        </div>

        <div className="col-2">
          <Button className="btnSpotifyLoad" variant="secondary" disabled={!spotifyId} onClick={getPlaylistData}>
            {
              isLoading 
              ? 
                <div className='p no-wrap'>
                  <img src={faSpinner} alt="Loading spotify playlist" className="fa-button spin" />
                </div>
              :
                <div className='p no-wrap'>
                  <img src={faRightToBracket} alt="Load spotify playlist" className="fa-button px-1" />
                  <span className="px-1">Load</span>
                </div>
            }
          </Button>
        </div>
      </div>
    </>
  )
}

export default PlaylistForm


/*
<Form className="spotify-id-input d-flex">
<div className="">
  <img src={spotifyLogo} alt="Spotify logo" className="step-icon" />
</div>

<Form.Group className="inputPlaylist mb-3">
  <Form.Control
    type="text"
    className={spotifyId ? 'valid-spotify-id' : ''}
    placeholder="Paste a Spotify playlist link..."
    onChange={handleInputChange}
  />
</Form.Group>

<Button className="btnSpotifyLoad px-4" variant="secondary" disabled={!spotifyId} onClick={getPlaylistData}>
  {
    isLoading 
    ? 
      <div className='p'>
        <img src={faSpinner} alt="Loading spotify playlist" className="fa btnSpotifyLoad-icon spin" />
      </div>
    :
      <div className='p'>
        <img src={faRightToBracket} alt="Load spotify playlist" className="fa btnSpotifyLoad-icon" />
        <span>Load</span>
      </div>
  }
</Button>

</Form>

*/