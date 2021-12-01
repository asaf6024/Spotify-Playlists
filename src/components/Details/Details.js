import React from 'react';
import './details.css'
const Details = ({ album, artists, name, external_urls }) => {

    return (
        <div className="offset-md-1 col-sm-4 detailsContainer" >
            <div className="row col-sm-12 px-0">
                <img
                    src={album.images[0].url}
                    alt={name}>
                </img>
                <i className="fas fa-play playButton fa-4x"
                    onClick={() => window.open(external_urls.spotify)}
                ></i>
                <div className='contentOfSong'>

                    <div className="row col-sm-12 px-0">
                        <h2 className="form-label col-sm-12">
                            {name}
                        </h2>
                    </div>
                    <div className="row col-sm-12 px-0">
                        <label htmlFor={artists[0].name} className="form-label col-sm-12 font-italic">
                            {/* <a href={artists[0].external_urls.spotify} target='_blank'> {artists[0].name}</a> */}
                            {
                                artists.map((artist, index) => {
                                    return <React.Fragment key={artist.id}>
                                        <a href={artist.external_urls.spotify} target='_blank'
                                            rel="noopener noreferrer"
                                        > {artist.name}</a>
                                        {artists.length > 1 && index !== artists.length - 1 ? <span className='font-italic'>,</span> : ''}
                                    </React.Fragment>
                                })
                            }
                        </label>
                    </div>
                </div>

            </div>


        </div>
    );
}

export default Details;