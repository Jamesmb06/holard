/* eslint-disable react-hooks/exhaustive-deps */
import '../../styles.scss'
import React, { useEffect, useState } from 'react';
import icon from '../../assets/images/Svg5.png';
import icon2 from '../../assets/images/Svg6.png';
import icon3 from '../../assets/images/Svg7.png';
import icon4 from '../../assets/images/Svg8.png';
import icon5 from '../../assets/images/Svg9.png';
import icon6 from '../../assets/images/Svg10.png';
import icon7 from '../../assets/images/Svg11.png';
import Footer from '../home/Footer'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    useEffect(() => {
        userAdmin();
    }, [])

    const [admin, setAdmin] = useState(true)
    const user = useSelector((store) => store.userStore);

    const userAdmin = () => {
        if (user.email === 'jamb1993@gmail.com') {
            setAdmin(false)
        } 
    }


    return (
        <div className='profile'>
            <div className='profile__options'>
                <aside>
                    <img src={user.avatar} alt="profile" />
                    <span>{user.name}</span>
                </aside>
                <section>
                    <button  onClick={() => { navigate('/edit') }}><img src={icon} alt="p" />Account</button>
                    <button><img src={icon2} alt="p" />Account edit</button>
                    <button><img src={icon3} alt="p" />Payment</button>
                    <button><img src={icon4} alt="p" />Language</button>
                    <button><img src={icon5} alt="p" />Location</button>
                    <button><img src={icon6} alt="p" />FAQ</button>
                    <button><img src={icon7} alt="p" />Support</button>
                </section>
                <button onClick={() => { navigate('/addRestaurant') }} disabled={admin}>Add Restaurants</button>
                <button onClick={() => { navigate('/addFood') }} disabled={admin}>Add Food</button>
            </div>
            <Footer />
        </div>
    )
}

export default Profile
