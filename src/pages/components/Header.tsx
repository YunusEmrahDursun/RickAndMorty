import React, { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen, faHouse, faStar } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();

  const homeClick = () => { navigate('/') }
  const favoritesClick = () => { navigate('/favorites') }
  const exitClick = () => { navigate('/login') }
  
  return (
    <header>
        <div className="container">
          <div id="top">
              <section>
                <div className="btn" onClick={homeClick}><FontAwesomeIcon icon={faHouse} className='mr10'/>AnaSayfa</div>
                <div className="btn" onClick={favoritesClick}><FontAwesomeIcon icon={faStar} className='mr10'/>Favoriler</div>
                <div className="btn" onClick={exitClick}><FontAwesomeIcon icon={faDoorOpen} className='mr10'/>Çıkış</div>
              </section>
          </div>
        </div>
    </header>
  )
}

export default memo(Header)