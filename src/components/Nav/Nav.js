import React, { useState, useEffect } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
// import { useHistory } from 'react-router'

//css
import './nav.css'

const NavPage = ({ country, changeCounrty }) => {

    const [bgDark, setBgDark] = useState(``)
    // let history = useHistory()

    useEffect(() => {

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }

    })

    //change nav style when scrolling
    const handleScroll = () => {
        if (window.scrollY > 40)
            setBgDark('black')
        else
            setBgDark(``)

    };

    return (
        <Navbar variant="dark" style={{ background: bgDark }} expand="lg" className='col-sm-12' id='navBar'>

            <Navbar.Brand href="/" className='col-sm-12 col-lg-7 font-weight-bold titleOfNav'
            >Spotify Playlists Globally
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="navbar-dark-example" />


            <Navbar.Collapse id="navbar-dark-example" className='col-sm-12 col-lg-5 text-center'>
                <Nav className='text-left row'>

                    {/* <NavItem className='navItem'>
                        <button className={country === 'IL' ? 'countryButton activeButton btn-success' : 'countryButton'} onClick={e => changeCounrty(e, 'IL')}>🇮🇱</button>
                        <button className={country === 'sv_US' ? 'countryButton activeButton btn-success' : 'countryButton'} onClick={e => changeCounrty(e, 'sv_US')}>🇺🇸</button>
                    </NavItem> */}
                    <label className='col-sm-4 text-white'>Country</label>

                    <select
                        id='countrySelected'
                        className='form-control col-sm-8'
                        onChange={e => changeCounrty(e, e.target.value)}>
                        <option value=''>Select Country...</option>
                        <option selected={true}>ISRAEL</option>
                        <option value='sv_US'>USA</option>
                        <option value='FR' >FRANCE</option>
                        <option value='IT' >ITALY</option>
                        <option value='GBR' >United Kingdom</option>
                        <option value='ES' >SPAIN</option>
                    </select>
                    {/* <hr className='mobileHr' /> */}

                </Nav>
            </Navbar.Collapse>
        </Navbar >
    )
}
export default NavPage