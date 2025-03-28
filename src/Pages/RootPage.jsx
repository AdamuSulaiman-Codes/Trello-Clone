import React from 'react'
import Header from '../componenets/Header'
import SideBar from '../componenets/SideBar'
import { TrelloContext } from '../store/Trello-Context'
import { useContext } from 'react'
import Modal from '../assets/Modal'
import { Outlet } from 'react-router'

const RootPage = () => {
  const {isModalOpen} = useContext(TrelloContext)
  return (
    <div className='app'>
      <Header/>
      <div className='app-section'>
        <SideBar/>
        {isModalOpen && <Modal/>}
        <Outlet/>
      </div>
    </div>
  )
}

export default RootPage