/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { SlArrowLeft } from 'react-icons/sl';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Plates = () => {
    const navigate = useNavigate()
    const { plates } = useSelector((store) => store.restaurant);
    console.log(plates)

    const back = () => {
        navigate('/home')
    }

    return (
        <div>
            <section className='d-flex flex-wrap'>
            <SlArrowLeft onClick={back} className='mt-3' size={20} />
                {
                    plates.map((element) => {
                        return (
                            <div>
                                <img src={element.img} className='rounded mb-2 plate__img' />
                                <p className='mb-2'>{element.name}</p>
                                <p>{element.price}</p>
                            </div>)
                    })
                }
            </section>
        </div>
    )
}

export default Plates