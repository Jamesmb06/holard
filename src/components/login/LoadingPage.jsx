import logo from '../../assets/images/Logo.png'
import '../../styles.scss'
import React, { useEffect, useState } from 'react'
import { Steppers } from '../steps/Steppers';


const LoadingPage = () => {

  const [loadingLogo, setLoadingLogo] = useState(true);

  const TimerSteps = () => {
    setTimeout(() => {
      setLoadingLogo(false);
    }, 3000);
  }

  useEffect(() => {
    TimerSteps();
  }, [])


  return (
    <>
    {
        loadingLogo ?
        <div className='img'>
          <img src={logo} alt='Logo Loading' />
        </div>
    :
    <Steppers />
    }
    </>
  )
}

export default LoadingPage