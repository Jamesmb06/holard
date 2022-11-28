import React from 'react'
import { AiOutlineHome } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { GiBackwardTime } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'

const Footer = () => {
 const navigate = useNavigate()

  return (
    <div className="footer d-flex position-fixed justify-content-around"> 
    <button onClick={() => navigate('/home')} className='btn'>
    <AiOutlineHome size={25}/>
    </button>
    <button onClick={() => navigate('/search')} className='btn'>
    <FiSearch size={25}/>
    </button>
    <button onClick={() => navigate('/order')} className='btn'>
    <GiBackwardTime size={25}/> 
    </button>
    <button onClick={() => navigate('/account')} className='btn'>
    <FaRegUser size={25}/>
    </button>
     </div>
  )
}

export default Footer