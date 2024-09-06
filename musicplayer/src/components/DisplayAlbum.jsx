/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import {  assets  } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'

const DisplayAlbum = ({album}) => {
    const {id} = useParams()
    const [albumData, setAlbumData] = useState("")
    const {playWithId, albumsData, songsData} = useContext(PlayerContext)

    useEffect(()=> {
        albumsData.map((item)=> {
            if (item._id === id) {
                setAlbumData(item)
            }
        })
    }, [])
    
  return albumData ? (
    <>
    <Navbar/>
    <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
        <img className='w-48 rounded' src={albumData.image} alt="" />
        <div className='flex flex-col'>
            <p>Playlist</p>
            <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{albumData.name}</h2>
            <h4>{albumData.desc}</h4>
            <p className='mt-1'>
                <img src={assets.spotify_logo} className='inline-block w-5' alt="" />
                • 1,323,142 likes
                • <b>50 songs,</b> about 2 hr 30 min


            </p>

        </div>
    </div>

          <div className='grid grid-cols-[auto_1fr_2fr_1fr] sm:grid-cols-[auto_1.5fr_2fr_1fr_1fr] mt-10 mb-4 pl-2 text-[#a7a7a7]'>
              <p className='flex items-center'><b className='mr-4'>#</b></p>
              <p>Name</p>
              <p>Album</p>
              <p className='hidden sm:flex justify-start'>Date Added</p>
              <img src={assets.clock_icon} className='m-auto w-4  sm:block' alt="" />
          </div>
          <hr />
          {songsData.filter((item) => item.album === album.name).map((item, index) => (
              <div onClick={() => playWithId(item._id)} key={index} className='grid grid-cols-[auto_1fr_2fr_1fr] sm:grid-cols-[auto_1.5fr_2fr_1fr_1fr] gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'>
                  <p className='text-white flex items-center'>
                      <b className='mr-2 text-[#a7a7a7]'>{index + 1}</b>
                  </p>
                  <p>{item.name}</p>
                  <p className='text-[15px] flex items-center'>
                      <img src={item.image} className='inline w-10 mr-5 h-10' alt="" />
                      {albumData.name}
                  </p>
                  <p className='text-[15px] hidden sm:block'>5 Days ago</p>
                  <p className='text-[15px] text-center'>{item.duration}</p>
              </div>
    ))}
    </>
  ) : null
}

export default DisplayAlbum