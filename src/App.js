import React, { useState, useEffect } from 'react';

//components
import Dropdown from './components/Dropdown/Dropdown';
import Listbox from './components/Listbox/Listbox';
import Detail from './components/Details/Details';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';

import axios from 'axios';
import './App.css'
import Favorites from './components/Favorites/Favorites';

const App = () => {


  // console.log('RENDERING APP.JS');

  // const data = [
  //   { value: 1, name: 'A' },
  //   { value: 2, name: 'B' },
  //   { value: 3, name: 'C' },
  // ];

  const [token, setToken] = useState('');
  const [genres, setGenres] = useState({ selectedGenre: '', listOfGenresFromAPI: [] });
  const [playlist, setPlaylist] = useState({ selectedPlaylist: '', listOfPlaylistFromAPI: [] });
  const [tracks, setTracks] = useState({ selectedTrack: '', listOfTracksFromAPI: [] });
  const [trackDetail, setTrackDetail] = useState(null);
  const [count, setCount] = useState(10)
  const [disabled, setDisabled] = useState('disabled')
  const [country, setCountry] = useState('IL')
  const [countryName, setCountryName] = useState('ISRAEL')
  const [sortType, setSortType] = useState(null)
  const [search, setSearch] = useState('')
  const [favorites, setFavorites] = useState([])

  useEffect(() => {

    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET)
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
      .then(tokenResponse => {
        setToken(tokenResponse.data.access_token);

        axios(`https://api.spotify.com/v1/browse/categories?locale=${country}`, {
          method: 'GET',
          headers: { 'Authorization': 'Bearer ' + tokenResponse.data.access_token }
        })
          .then(genreResponse => {
            setGenres({
              selectedGenre: genres.selectedGenre,
              listOfGenresFromAPI: genreResponse.data.categories.items
            })
          });

      });

  }, [genres.selectedGenre, country]);

  const genreChanged = (val) => {
    setGenres({
      selectedGenre: val,
      listOfGenresFromAPI: genres.listOfGenresFromAPI
    });

    axios(`https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=20`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(playlistResponse => {
        setPlaylist({
          selectedPlaylist: playlist.selectedPlaylist,
          listOfPlaylistFromAPI: playlistResponse.data.playlists.items
        })
      });

    console.log(val);
  }

  const playlistChanged = val => {
    console.log(val);
    setPlaylist({
      selectedPlaylist: val,
      listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI
    });
  }

  const buttonClicked = e => {
    e.preventDefault();

    axios(`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=${count}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(tracksResponse => {
        setTracks({
          selectedTrack: tracks.selectedTrack,
          listOfTracksFromAPI: tracksResponse.data.items
        })
      });
  }

  const listboxClicked = val => {

    const currentTracks = [...tracks.listOfTracksFromAPI];
    const trackInfo = currentTracks.filter(t => t.track.id === val);
    setTrackDetail(trackInfo[0].track);

  }

  const changeCounrty = (e, country) => {

    let index = e.nativeEvent.target.selectedIndex;

    e.preventDefault()
    setCountry(country)
    setCountryName(e.nativeEvent.target[index].text)
  }

  const updateFavorites = (obj, isDelete) => {

    if (favorites.length > 0)
      !isDelete ? setFavorites([...favorites, obj]) : setFavorites(obj)
    else
      setFavorites([obj])

  }

  return (
    <>
      <Nav
        country={country}
        changeCounrty={changeCounrty}
      />
      <div className='container-fluid'>
        <Favorites
          favorites={favorites}
          updateFavorites={updateFavorites}
          setFavorites={setFavorites}
        />

        <div className="container">
          <h1 className='text-left'>Popular Music in {countryName}</h1>

          <form onSubmit={buttonClicked}>

            <Dropdown
              label="Genre:"
              options={genres.listOfGenresFromAPI}
              selectedValue={genres.selectedGenre}
              changed={genreChanged}
            />

            <Dropdown
              label="Playlist:"
              options={playlist.listOfPlaylistFromAPI}
              selectedValue={playlist.selectedPlaylist}
              changed={playlistChanged}
              setCount={setCount}
              setDisabled={setDisabled}
            />

            <div className="col-sm-6 row form-group px-0">
              <button type='submit' disabled={disabled} className="btn btn-success col-sm-6"
                style={{ margin: 'auto', borderRadius: '5px' }}>
                Search
              </button>
            </div>
            {/* {console.log(tracks.listOfTracksFromAPI)} */}

            <div className="row">
              {

                tracks.listOfTracksFromAPI.length > 0 &&

                <Listbox
                  // items={tracks.listOfTracksFromAPI.sort((a, b) => a.track.popularity - b.track.popularity)}
                  sortType={sortType}
                  setSortType={setSortType}
                  search={search}
                  setSearch={setSearch}
                  disabled={disabled}
                  items={tracks.listOfTracksFromAPI
                    .filter(res => {
                      if (search === '')
                        return res;
                      else if (
                        res.track.name.toLowerCase().includes(search.toLowerCase())
                      )
                        return res;

                    })
                    .sort((a, b) => {
                      return sortType === 'PopularFirst' ?
                        b.track.popularity - a.track.popularity
                        : sortType !== null && new Date(a.track.added_at) - new Date(b.track.added_at)
                    })
                  }

                  clicked={listboxClicked}
                  setCount={setCount}
                  playlistChanged={playlistChanged}
                  selectedPlaylist={playlist.selectedPlaylist}
                />
              }

              {trackDetail &&
                <Detail
                  favorites={favorites}
                  setFavorites={setFavorites}
                  updateFavorites={updateFavorites}
                  {...trackDetail} />}
            </div>

          </form>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;