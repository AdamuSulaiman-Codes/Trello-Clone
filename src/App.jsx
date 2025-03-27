import React from 'react'
import Header from './componenets/Header'
import SideBar from './componenets/SideBar'
import MainSection from './componenets/MainSection'
import { TrelloContext } from './store/Trello-Context'
import { useContext } from 'react'
import Modal from './assets/Modal'

const App = () => {
  const {isModalOpen} = useContext(TrelloContext)
  return (
    <div className='app'>
      <Header/>
      <div className='app-section'>
        <SideBar/>
        {isModalOpen && <Modal/>}
        <MainSection/>
      </div>
    </div>
  )
}

export default App