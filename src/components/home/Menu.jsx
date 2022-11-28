/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import { GiFruitBowl, GiFullPizza, GiSushis } from "react-icons/gi";
import { MdOutlineBakeryDining } from "react-icons/md";
import { BiCoffeeTogo } from "react-icons/bi";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  actionGetPlatesAsync,
  actionFilterRestaurantAsync,
  actionGetRestaurantAsync,
} from "../../redux/actions/restaurantAction";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { restaurants } = useSelector((store) => store.restaurant);
  console.log(restaurants);

  useEffect(() => {
    dispatch(actionGetRestaurantAsync());
  }, [dispatch]);

  const buttonFiltered = (searchValue) => {
    const searchParam = "type";
    dispatch(actionFilterRestaurantAsync(searchParam, searchValue));
  };

  const restaurantsDetails = (element) => {
    let searchValue = element.name;
    const searchParam = "name";
    dispatch(actionFilterRestaurantAsync(searchParam, searchValue));
    dispatch(actionGetPlatesAsync(searchValue));
    navigate("/details");
  };
  const filterbtn = [
    {
      id: 1,
      button: "All",
      icon: <AiOutlineDeploymentUnit />,
    },
    {
      id: 2,
      button: "Fast Food",
      icon: <IoFastFoodOutline />,
    },
    {
      id: 3,
      button: "Pizza",
      icon: <GiFullPizza />,
    },
    {
      id: 4,
      button: "Salad",
      icon: <GiFruitBowl />,
    },
    {
      id: 5,
      button: "Sushi",
      icon: <GiSushis />,
    },
    {
      id: 6,
      button: "Coffee",
      icon: <BiCoffeeTogo />,
    },
    {
      id: 6,
      button: "Bakery",
      icon: <MdOutlineBakeryDining />,
    },
  ];

  return (
    <div>
      {restaurants.map((element, index) => {
        let puntaje = 0;
        if (element.rate === 4) {
          puntaje = "★★★★";
        }
        return (
          <div
            className="mt-3 restaurant d-flex"
            key={index}
            onClick={() => {
              restaurantsDetails(element);
            }}
          >
            <figure className="imgcnt">
              <img className="restaurant__logo" src={element.img} />
            </figure>
            <aside className="d-flex flex-column ms-3 aside">
              <h5>{element.name}</h5>
              <span>{puntaje}</span>
              <p className="mb-0"> Work time {element.time}</p>
              <p className="p_text mt-0">Before you {element.dollar}</p>
            </aside>
          </div>
        );
      })}

      <div>
        <p className="mt-4">Restaurants and coffees</p>
        <div className="btnstyle">
          {filterbtn.map((filter) => {
            return (
              <div className="banner__item" key={filter.id}>
                <button
                  className="btn btnclick"
                  onClick={() => {
                    buttonFiltered(filter.button);
                  }}
                >
                  <span className="me-3">{filter.icon}</span>
                  <span>{filter.button}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Menu;
