import React from 'react';
import './listbox.css'

const Listbox = props => {

    const clicked = e => {
        e.preventDefault();
        props.clicked(e.target.id);
    }

    return (
        <div className="col-sm-6 px-0">
            <div className="list-group" style={props.items.length > 1 ? { overflow: 'scroll' } : {}}>

                {/* {
                    props.items.length > 1 && */}
                <div className='sortAndSerachDiv row'>
                    <div className='col-sm-12 col-lg-6'>
                        <i class="fas fa-sort-amount-up"
                            onClick={() => props.sortType === 'PopularFirst' ? props.setSortType('ByDate') : props.setSortType('PopularFirst')}
                        ></i>
                        <span style={{}}>
                            {
                                props.sortType === null ? '' :
                                    props.sortType === 'PopularFirst' ? 'Sort by Popularity' : 'Sort by Date added'
                            }
                        </span>
                    </div>
                    <input className='col-sm-12 col-lg-6'
                        placeholder='Search...'
                        value={props.search}
                        onChange={(e) => props.setSearch(e.target.value)}
                        type='search'
                        disabled={props.disabled}
                    />
                </div>
                {/* } */}
                {
                    props.items.map((item, idx) =>
                        <button key={idx}
                            onClick={clicked}
                            className="list-group-item list-group-item-action list-group-item-light"
                            id={item.track.id}>

                            {item.track.name}
                            {/* | {item.added_at} | {item.track.popularity} */}
                        </button>)
                }
                {
                    props.items.length > 1 && props.items.length < 50 ?
                        <button
                            className="btn btn-info"
                            onClick={() => {
                                props.setCount(prevCount => prevCount + 10)
                                props.playlistChanged(props.selectedPlaylist)
                            }}>Load More...</button> : ''
                }
            </div>
        </div>


    );
}

export default Listbox;