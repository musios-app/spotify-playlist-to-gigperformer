import faSpotify from './assets/images/fa-spotify-white.svg'
import PropTypes from 'prop-types'

PlaylistTracks.propTypes = {
  playlistData: PropTypes.object.isRequired
}



function PlaylistTracks(props) {
  
  const data = props.playlistData

  if (!data)
    return <></>
  else 
    return (
      <>
        <table className='playlist-tracks'>
          <thead>
            <tr>
              <th className='track-spotify'>Listen</th>
              <th className='track-name'>Name</th>
              <th className='track-album'>Album</th>
              <th className='track-artists'>Artists</th>
              <th className='track-time'>Time (sec)</th>
              <th className='track-released'>Released</th>
              <th className='track-popularity'>Popularity</th>
            </tr>
          </thead>
          <tbody>
            {data.tracks.items.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td className='track-spotify'>
                    <a href={item.track.external_urls.spotify} target="_blank">
                      <img src={faSpotify} height="20"/>
                    </a>
                  </td>
                  <td className='track-name'>{item.track.name}</td>
                  <td className='track-album'>{item.track.album.name}</td>
                  <td className='track-artists'>{item.track.artists.map(a => a.name).join(", ")}</td>
                  <td className='track-time'>{(item.track.duration_ms / 1000).toFixed(1)}</td>
                  <td className='track-released'>{item.track.album.release_date}</td>
                  <td className='track-popularity'>{item.track.popularity}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    )
}

export default PlaylistTracks
