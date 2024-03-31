import React, { memo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale, faFemale, faQuestion, faStar as star } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import Empty from 'components/Empty';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import type { RootState } from 'store/store';
import { addFavorite, deleteFavorite  } from 'store/userInfoSlice';


const Favorites = () => {
  
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const favorites = useAppSelector((state:RootState) => state["user"]["favorites"] );

  const [search, setSearch] = useState("");

  const drawGender = (type) => { 
    if( type == 'Male'){
      return <FontAwesomeIcon icon={faMale} />
    }else if( type == 'Female'){
      return <FontAwesomeIcon icon={faFemale} />
    }else{
      return <FontAwesomeIcon icon={faQuestion} />
    }
  }
  const favoritesClick = (item) => { 

    const foundIndex = favorites.findIndex(i=> i.id == item.id);
    
    if(foundIndex > -1){

      dispatch(deleteFavorite(foundIndex))

    }else{
      
      dispatch(addFavorite({
        id:item.id,
        name:item.name,
        image:item.image,
        species:item.species,
        gender:item.gender
      }))

    }
   

  }
  const detailClick = (id) => { 
    navigate('/detail/'+ id)
  }
  return (
    <>
      <div className='filterArea'>
        <div id='search-box'>
          <input type="text" placeholder='Ara' value={search} onChange={(e)=> setSearch(e.target.value)} />
        </div>
      </div>
      
      <div className="clear"></div>

      { favorites.length == 0 ? <Empty/> : <div className='content'>
        
        {
          favorites.filter(item=>  search != "" ? item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) : true ).map(item=> <div className='character-card' key={item.id}>

              <div className='position-relative cursor-pointer' onClick={()=>{detailClick(item.id)}}>
                { item.status === 'Dead' && <img className='character-stamp' src={'./img/death.png'}/>}
                <img className='character-image' src={item.image}/>
                <div className='character-name'>{item.name}</div>
              </div>
              <div className='character-description'>
                <div className='flex'>
                  {drawGender(item.gender)}
                  <div className='character-species ml10'>{item.species}</div>
                </div>
                <div className='cursor-pointer' onClick={ ()=> { favoritesClick(item) }}>
                    <FontAwesomeIcon icon={star} color='#FFD700'/> 
                </div>
              </div>

          </div>)  
        }

      </div>}

    </>

  )
}

export default memo(Favorites)