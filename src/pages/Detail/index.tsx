import React, { memo, useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import Loading from 'components/Loading';
const initialData = {
  id:0,
  name:"",
  origin:"",
  image:"",
  location:"",
  gender:"",
  status:"",
  species:""
}
const Detail = () => {
  const [loading, setLoading] = useState(true);
  let { id } = useParams();

  const [data, setData] = useState(initialData);

  useEffect(() => {

    if(id){
      getData();
    }

  }, [])
  
  const getData = () => { 
    setLoading(true); 

    axios.get(`https://rickandmortyapi.com/api/character/`+ id).then(res => {

      const Data = res.data;

      setData({
        id:Data.id,
        name:Data.name,
        origin:Data.origin.name,
        image:Data.image,
        location:Data.location.name,
        gender:Data.gender,
        status:Data.status,
        species:Data.species
      });

      setTimeout(() => {
        setLoading(false);   
      }, 500);

    })
  }

  return ( 
    <>
      { loading ? <Loading/> : <div className='container flex'>
        <div>
          <img src={data.image} />
        </div>
        <div className='float-left ml10'>
          <div className='flex'>
            <h1>{data.name}</h1>
            <div className={ 'status-'+ (data.status == 'Alive' ? 'active' : 'deactive') }></div>
          </div>
          <div className="flex">
            <h3>İlk kez şurada görüldü:</h3>
            <div className='ml10 mt5'>{data.origin}</div>
          </div>
          <div className="flex">
            <h3>Bilinen son konum:</h3>
            <div className='ml10 mt5'>{data.location}</div>
          </div>
          <div className="flex">
            <h3>Cinsiyet:</h3>
            <div className='ml10 mt5'>{data.gender}</div>
          </div>
          <div className="flex">
            <h3>Tür:</h3>
            <div className='ml10 mt5'>{data.species}</div>
          </div>
        </div>
      </div> }
    </>
  )
}

export default memo(Detail)