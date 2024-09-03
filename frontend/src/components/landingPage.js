import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Route, Switch, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getTools } from '../store/tools';
import "./landingPage.css"

const LandingPage = () => {
  const dispatch = useDispatch();
  const tools = useSelector(state => state.tools.tools);

  useEffect(() => {
    dispatch(getTools());
  }, []);

  return (
    <div className='allTools'>
      {Object.values(tools).map(({ id, name, city, state, price, previewImage, avgRating }) => (
        <NavLink className='toolLink' to={`/tools/${id}`}>
          <h2 className=' toolNameCard'>{name}</h2>
          <img src={`${previewImage}`}></img>

          <div className='container2'>
            <h3 className=' toolNameCard2'>{name}</h3>

            <div className='rating'>
              {avgRating ? (
                <>
                  <i class="fa-sharp fa-solid fa-star"></i>
                  <h6>{`${Number(avgRating).toFixed(2)}`}</h6>
                </>
              ) : (<>
                <i class="fa-sharp fa-solid fa-star"></i>
                <h6>New</h6>
              </>)}
            </div>
          </div>
          
          <h4>{`$${price.toFixed(2)} / day`}</h4>
        </NavLink>
      ))}
    </div>

  );
};

export default LandingPage;