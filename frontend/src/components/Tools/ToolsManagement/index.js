import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Route, Switch, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserTools } from '../../../store/tools';
import OpenModalButton from "../../OpenModalButton"
import DeleteTool from "../DeleteTool"
import UpdateTool from "../UpdateTool"

import './index.css';

const ToolsManagement = () => {
  const dispatch = useDispatch();
  const tools = useSelector(state => state.tools.tools);

  useEffect(() => {
    dispatch(getUserTools());
  }, []);

  return (
    <div className='toolsManagement'>
      <h1>Manage Tools</h1>
      <NavLink className = "createNew" exact to="/tools/new"><button className='createNewButton'>Create a New Tool</button></NavLink>
      {Object.keys(tools).length &&
        <div className='allTools'>
          {Object.values(tools).map(({ id, name, city, state, price, previewImage, avgRating }) => (
            <>
              <NavLink className='toolLink' to={`/tools/${id}`}>
                <h2 className=' toolNameCard'>{name}</h2>
                <img src={`${previewImage}`}></img>

                <div className='container2'>
                  <h3>{city}, {state}</h3>

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

                <h4>{`$${price.toFixed(2)} night`}</h4>

              </NavLink>

              <div>

                <NavLink to={`/tools/${id}/edit`}>
                  <button className='updateButton'>
                    Update
                  </button>
                </NavLink>
                <div className='deleteButton'>  <OpenModalButton className='deleteToolButton'
                  buttonText="Delete"
                  modalComponent={<DeleteTool id={id} />}
                /></div>
                <></>
              </div></>
          ))}
        </div>
      }

    </div>
  )
};

export default ToolsManagement;