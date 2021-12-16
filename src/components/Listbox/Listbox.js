import React from 'react';
import './listbox.css'

const Listbox = (props) => {

    const clicked = e => {
        e.preventDefault();
        props.clicked(e.target.id);

        if (window.innerWidth < 1000)
            window.location.href = '#details';
    }


    return (
        <div className="col-lg-6 col-md-12  px-0">
            <div className="list-group" style={props.items.length > 1 ? { overflow: 'scroll' } : {}}>
                {
                    // props.items.length > 0 &&
                    <div className='sortAndSearchDiv row'>
                        <div className='col-sm-4 sortDiv'
                            style={props.disabled == 'disabled' ? { cursor: 'not-allowed' } : { cursor: 'pointer' }}
                            onClick={() => {
                                if (props.disabled != 'disabled')
                                    props.sortType === 'PopularFirst' ? props.setSortType('ByDate') : props.setSortType('PopularFirst')
                            }}
                        >
                            <i className="fas fa-sort-amount-up"
                            ></i>&nbsp;
                            <span>
                                {
                                    props.sortType === null ? 'Sort' :
                                        props.sortType === 'PopularFirst' ? 'Popular first' : 'Sort by Date'
                                }
                            </span>
                        </div>

                        <input className='col-sm-8 form-control'
                            placeholder='Search...'
                            value={props.search}
                            onChange={(e) => props.setSearch(e.target.value)}
                            type='search'
                            disabled={props.disabled}
                        />
                    </div>
                }
                <div className='row rowOfSong'>

                    {
                        props.items.map((item, idx) =>
                            <React.Fragment key={idx}>

                                <button
                                    onClick={clicked}
                                    className="list-group-item list-group-item-action list-group-item-light"
                                    id={item.track.id}>
                                    {item.track.name}
                                    {/* | {item.added_at} | {item.track.popularity} */}
                                    {
                                        item.track.popularity > 90 &&
                                        <i className="popularSongIcon fas fa-fire-alt fa-2x" title="Very Popular"></i>
                                    }

                                </button>
                            </React.Fragment>
                        )
                    }
                </div>
                {
                    props.items.length > 1 && props.items.length < 50 ?
                        <button
                            className="btn-info"
                            style={{ border: 'none' }}
                            onClick={() => {
                                props.setCount(prevCount => prevCount + 10)
                                props.playlistChanged(props.selectedPlaylist)
                            }}>Load More...</button> : ''
                }
            </div>
        </div >


    );
}

export default Listbox;