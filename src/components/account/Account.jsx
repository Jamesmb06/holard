import React from 'react';
import Footer from '../home/Footer';
import { useSelector } from 'react-redux';
import icon from '../../assets/images/Svg12.png';

const Account = () => {

    const user = useSelector((store) => store.userStore);

  return (
      <div className='profile'>
            <div className='profile__options'>
                <aside>
                    <img src={user.avatar} alt="profile" />
                </aside>
                <section>
                    <button>{user.name}  <img src={icon} alt="p" /></button>
                    <button>{user.email}  <img src={icon} alt="p" /></button>
                    <button>celular  <img src={icon} alt="p" /></button>
                    <button>tarjeta credito   <img src={icon} alt="p" /></button>
                </section>
                <Footer/>
            </div>
            <button>Save</button>
        </div>
  )
}

export default Account