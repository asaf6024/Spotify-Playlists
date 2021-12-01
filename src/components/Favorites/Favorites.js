import React, { useEffect, useState } from 'react'
import './favorites.css'

function Favorites({ favorites, updateFavorites, setFavorites }) {
    const [display, setDisplay] = useState('none')
    const [icon, setIcon] = useState('fas fa-plus-circle')

    let favoritesFromStorage = JSON.parse(localStorage.getItem('favoritesStorage'))

    useEffect(() => {

        if (favoritesFromStorage != null)
            setFavorites(favoritesFromStorage)

    }, [])

    useEffect(() => {
        if (favorites.length > 0) {
            setDisplay('block')
            setIcon('fas fa-minus-circle')

            console.log('favorites is', favorites)
        }



    }, [favorites])

    const deleteFavoriteItem = (name) => {

        let favoriteToUpdate = favorites.filter(f => f.name != name)
        updateFavorites(favoriteToUpdate, true)
        if (favoriteToUpdate.length == 0)
            setDisplay('none')

        //delete current local storage
        localStorage.removeItem('favoritesStorage')
        //add a new local storage
        localStorage.setItem('favoritesStorage', JSON.stringify(favoriteToUpdate));
    }

    const deleteAllFavorites = () => {
        updateFavorites([], true)
        localStorage.removeItem('favoritesStorage')
    }

    const saveAllFavorites = () => {

        //delete current local storage
        localStorage.removeItem('favoritesStorage')
        //add a new local storage
        localStorage.setItem('favoritesStorage', JSON.stringify(favorites));
        alert('Favorites saved')

    }

    const displayFavoriteSection = () => {

        if (display == 'block') {
            setIcon('fas fa-plus-circle')
            setDisplay('none')
        }
        else {
            setIcon('fas fa-minus-circle')
            setDisplay('block')
        }
    }

    return (
        <div className='favorites'>
            <i className={`${icon} text-white fa-2x favoritesIcon`}
                onClick={() => displayFavoriteSection()}
            ></i>
            <div className={`favoritesContainer ${display == 'none' ? 'fadeOut' : 'customFadeIn'}`}
                style={{ display }}
            >

                <h2 className='text-center'>Favorites</h2>

                {
                    favorites.length > 0 ?
                        <>
                            {
                                favorites.map((favorite, i) => {
                                    console.log(favorite)
                                    return <React.Fragment key={favorite.external_urls}>
                                        <div className='songRow animated fadeIn' style={{ marginTop: '30px' }}>
                                            <h3 className='songName text-white' onClick={() => window.open(favorite.external_urls)}
                                            >{favorite.name}</h3>


                                            <i className="text-white far fa-trash-alt"
                                                title='Delete Song'
                                                onClick={() => deleteFavoriteItem(favorite.name)}
                                            ></i>
                                        </div>
                                        <div className='artistsOfFavorite'>
                                            {
                                                favorite.artists.map((artist, index) => {
                                                    return <React.Fragment key={artist.id}>
                                                        <a href={artist.external_urls.spotify} target='_blank'
                                                            rel="noopener noreferrer"
                                                        > {artist.name}</a>

                                                        {favorite.artists.length > 1 && index !== favorite.artists.length - 1 ? <span className='font-italic  text-white'>, </span> : ''}
                                                    </React.Fragment>
                                                })
                                            }
                                        </div>
                                        {favorites.length - 1 != i && <hr />}

                                    </React.Fragment>
                                })}
                            <i className="col-sm-2 text-white far fa-trash-alt fa-1x deleteAllIcon animated fadeIn"
                                title='Delete all Songs'
                                onClick={() => deleteAllFavorites()}
                            ></i>
                            <i className="col-sm-2 text-white fas fa-save saveAllIcon animated fadeIn"
                                title='Save Favorites'
                                onClick={() => saveAllFavorites()}
                            ></i>
                        </>
                        : <>
                            <br />
                            <h3 className='text-white text-center'>Favorite list is empty</h3>
                        </>
                }
            </div>
        </div>
    )
}

export default Favorites
