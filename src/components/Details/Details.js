import React, { useEffect, useState } from 'react';
import './details.css'

const Details = ({ album, artists, name, external_urls, favorites, updateFavorites }) => {
    const [icon, setIcon] = useState('')

    useEffect(() => {

        favorites.length > 0 ? checkItemInFavorites() : setIcon('far fa-heart text-white fa-2x')
    }, [artists, favorites])

    const checkItemInFavorites = () => {
        let checkIfInFavorites = favorites.some(f => f.album === album.images[0].url)
        checkIfInFavorites ? setIcon('fas fa-heart text-white fa-2x') : setIcon('far fa-heart text-white fa-2x')
    }

    const updateToFavorites = (album, external_urls, name, artists) => {

        if (icon === 'fas fa-heart text-white fa-2x') {
            setIcon('far fa-heart text-white fa-2x')

            let favoriteToUpdate = favorites.filter(f => f.external_urls != external_urls)
            updateFavorites(favoriteToUpdate, true)

        }

        else {
            setIcon('fas fa-heart text-white fa-2x')

            let objectToAdd = {
                album,
                artists,
                name,
                external_urls
            }
            updateFavorites(objectToAdd, false)

        }

    }

    return (
        <div id='details' className="offset-md-1 col-lg-4 col-md-12 detailsContainer animated fadeIn" >
            <div className="row col-sm-12 px-0" style={{ margin: '0' }}>
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
                                        <i className={icon}
                                            title={
                                                icon === 'fas fa-heart text-white fa-2x' ?
                                                    'Remove from Favorites'
                                                    : 'Add to Favorites'
                                            }
                                            onClick={() => updateToFavorites(album.images[0].url, external_urls.spotify, name, artists)}
                                        ></i>

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