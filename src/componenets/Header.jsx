import React from 'react'
import "./header.css"
import { useNavigate } from 'react-router'
const Header = () => {
  const navigate = useNavigate()
  return (
    <header>
        <h1 className='header-text' onClick={()=>{
          navigate("")
        }}>Trello Clone</h1>
    </header>
  )
}

export default Header