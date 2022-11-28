/* eslint-disable jsx-a11y/alt-text */
import '../../styles.scss'
import React from 'react'
import { BsSearch } from "react-icons/bs";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { actionFilterPlatesAsync } from '../../redux/actions/restaurantAction';
import { useNavigate } from 'react-router-dom';
import Footer from '../home/Footer';

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { plates } = useSelector((store) => store.restaurant);

  const {
    register,
    handleSubmit,
  } = useForm();

  const platesFiltered = (element) => {
    let searchValue = element.name
    let searchParam = 'name'
    dispatch(actionFilterPlatesAsync(searchParam, searchValue))
    navigate('/plates')
};

  const submit = (data) => {
    console.log(data)
    const search = data.search;
    let searchValue = search;
    const searchParam = "type";
    dispatch(actionFilterPlatesAsync(searchParam, searchValue));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <label className='input-group p-3'>
        <span class="input-group-text text-light">
          <BsSearch />
          </span>
          <input
            type="text"
            placeholder='Search for a dish'
            className='form-control'
            {...register("search", { required: true })}
          />
        </label>
      </form>
      <section className='d-flex flex-wrap'>
        {
          plates.map((element, index) => {
            return (
              <div className='col-6' onClick={() => { platesFiltered(element) }}>
                <img src={element.img} className='rounded mb-2 plate__img' />
                <p className='mb-0'>{element.name}</p>
                <p>{element.price}</p>
              </div>)
          })
        }
      </section>
      <Footer/>
    </div>
  )
}

export default Search