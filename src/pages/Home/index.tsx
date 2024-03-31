import React, { memo, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale, faFemale, faQuestion, faStar as star } from '@fortawesome/free-solid-svg-icons'
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons'
import { useNavigate } from 'react-router-dom';
import Loading from 'components/Loading';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from 'hooks'
import { addFavorite, deleteFavorite  } from '../../store/userInfoSlice'; 
import type { RootState } from 'store';

let throttleTimer;
const Home = () => {

  const navigate = useNavigate();
  
  const dispatch = useAppDispatch();
  
  const [firstLoading, setFirstLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  const favorites = useAppSelector((state:RootState) => state["data"]["favorites"] );
  
	const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");

  
  useEffect(() => {
    getData();
  }, [currentPage])

  useEffect(() => {

		if ( firstLoading === false ) {
			if ( currentPage === 1 ){
				getData();
			}else{
				setCurrentPage(1);
			}
		}

	}, [search]);
  
  const getData = () => { 
    setLoading(true); 

    axios.get(`https://rickandmortyapi.com/api/character/?page=`+currentPage+"&name="+search).then(res => {

      const Data = res.data;
      setData(Data.results);

      setTotalPage(Data.info.pages);
      
      setFirstLoading(false);
      setTimeout(() => {
        setLoading(false);   
      }, 500);

    })

  }
  const pageChange = (type : 'first' | 'prev' | 'next' | 'end' ) => {
    if ( type === 'first' ){
        setCurrentPage(1);
    }else if ( type === 'prev' ){
        setCurrentPage(currentPage - 1);
    }else if ( type === 'next' ){
        setCurrentPage(currentPage + 1);
    }else if ( type === 'end' ){
        setCurrentPage(totalPage);
    }
  }
  const drawPager = () => { 
    const drawPrevButtons=[];
    const drawNextButtons=[];
   
    for (let i = 3; i > 0; i--) {

      if(currentPage - i <= 0 ) continue;

      drawPrevButtons.push(
        <div className='pageButton' key={currentPage - i}>
          <a onClick={()=> setCurrentPage(currentPage - i)}>{currentPage - i}</a>
        </div>
      )
    }

    for (let i = 1; i < 4; i++) {

      if(currentPage + i >= totalPage ) break;

      drawNextButtons.push(
        <div className='pageButton' key={currentPage + i}>
          <a onClick={()=> setCurrentPage(currentPage + i)}>{currentPage + i}</a>
        </div>
      )

    }
    
    return  (
      <div className='pager'>
        {
          currentPage != 1 && <div className='pageButton'>
            <a onClick={()=> pageChange('prev')}>{"<"}</a>
          </div>
        }

        {
          drawPrevButtons
        }

        <div className='pageButton'>
          <a className='active'>{currentPage}</a>
        </div>

        {
          drawNextButtons
        }

        {
          currentPage < totalPage && <div className='pageButton'>
            <a onClick={()=> pageChange('next')}>{">"}</a>
          </div>
        }

      </div>
    )
  }
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
  const onSearchChange = (e) => {
    const value = e.target.value;
		throttle(()=> {
			if(value.length >= 3){
				setSearch(value);
			} else if(!value){
				setSearch(value);
			}
		}, 500);
		setSearchValue(value);
	}
  const throttle = (callback, limit) => {
    clearTimeout(throttleTimer);
    throttleTimer = setTimeout(() => {
      callback();
    }, limit);
  }
  return (
    <>
      <div className='filterArea'>
        <div id='search-box'>
          <input type="text" placeholder='Ara' value={searchValue} onChange={onSearchChange} />
        </div>
      </div>
      <div className="clear"></div>
      { loading ? <Loading/> : <div className='content'>
        
        {
          data.map(item=> <div className='character-card' key={item.id}>

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
                  {
                    favorites.some(i=> i.id == item.id ) ? <FontAwesomeIcon icon={star} color='#FFD700'/> : <FontAwesomeIcon icon={emptyStar} color='#FFD700'/>
                  }
                  
                </div>
              </div>

          </div>)  
        }

      </div>}

      {drawPager()} 
  
    </>

  )
}

export default Home