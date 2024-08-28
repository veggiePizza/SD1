import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { readTool } from '../../store/tools';
import { getReviews } from '../../store/reviews';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../Session/loginPopUp';
import CreateReview from '../Reviews/CreateReview'
import DeleteReview from '../Reviews/DeleteReview'
import './index.css';

const ToolPage = () => {
  const { id } = useParams();
  let newX = id;
  const dispatch = useDispatch();

  const [deleted, setDeleted] = useState("")
  const tool = useSelector(state => state.tools.tool);
  const reviews = useSelector(state => state.reviews.reviews);
  const sessionUser = useSelector(state => state.session.user);

  let hasReview = "";
  let allowPost = ""



  useEffect(() => {
    dispatch(readTool(id));
  }, [reviews]);

  useEffect(() => {
    dispatch(getReviews(id));
  }, []);

  function parseDate(date) {
    let parsedDate = new Date(date) + '';
    let dateString = parsedDate.split(' ');
    return `${dateString[1]} ${dateString[3]}`
  }


  if (sessionUser) {

    if (tool && sessionUser.id === tool.ownerId) {

      allowPost = false;
      console.log(allowPost);
    }
    else allowPost = true;


    if (reviews) {
      let check = false;
      Object.values(reviews).forEach(review => {
        if (review.userId === sessionUser.id)
          check = true;
      }
      );

      if (check)
        hasReview = true
      else hasReview = false

    }
  }


  return (
    <>
      {tool
        && <>
          <div className='toolDetails'>
            <h1>{`${tool.name}`}</h1>
            <h2>{`${tool.city}, ${tool.state}, ${tool.country}`}</h2>
            <div className='toolImages'>
              <>{tool.ToolImages &&
                <>
                  {Object.values(tool.ToolImages).length && <>
                    <img className="mainPicture" src={tool.ToolImages[0].url}></img>
                  </>}
                </>

              }
                <div className="sidePictures">
                  {tool.ToolImages && (<>{Object.values(tool.ToolImages).map(({ id, url }) => (
                    <>
                      {tool.ToolImages[0].id != id && <img className="pictures" src={url}></img>}
                    </>
                  ))}</>)}
                </div>
              </>
            </div>

            <div className='reserve'>
              <div className="description">
                {tool.Owner && (<><h2>{`Rented by ${tool.Owner.firstName} ${tool.Owner.lastName}`}</h2></>)}
                <h4>{`${tool.description}`}</h4>
              </div>


              <div className='reserveMenu'>

                <div className='descriptionBox'>

                  <h4>{`$${tool.price} day`}</h4>

                  <div className="ratingSummary">
                    {tool.avgStarRating ? (
                      <>
                        <i class="fa-sharp fa-solid fa-star"></i>
                        <h6>{`${Number(tool.avgStarRating).toFixed(2)}`}</h6>
                        <h2>·</h2>
                        {tool.Reviews.length == 1 ? (
                          <h7>{`1 review`}</h7>
                        ) : (
                          <h7>{`${tool.numReviews} reviews`}</h7>)}
                      </>
                    ) : (<>
                      <i class="fa-sharp fa-solid fa-star"></i>
                      <h6>New</h6>
                    </>)}
                  </div>
                </div>
                <div className="reserveButton">
                  <OpenModalButton
                    buttonText="Click to Rent"
                    modalComponent={<h2>Feature Coming Soon...</h2>}
                  /></div>

              </div>

            </div>


          </div>

          <div className='reviews'>


            {tool.avgStarRating ? (
              <>
                <div className='leaveReview'>
                  <div className='ratingSummary2'>

                    <i class="fa-sharp fa-solid fa-star"></i>
                    <h6>{`${Number(tool.avgStarRating).toFixed(2)}`}</h6>
                    {tool.Reviews.length == 1 ? (
                      <h7>{`1 review`}</h7>
                    ) : (
                      <h7>{`${tool.numReviews} reviews`}</h7>)}
                  </div>


                  <div>
                    {!hasReview && <>     {allowPost &&
                      <div className='postReviewButton'>
                        <OpenModalButton
                          buttonText="Post Your Review"
                          modalComponent={<CreateReview />}
                        />
                      </div>
                    }
                    </>}
                  </div>

                </div>

                <ol className='allReviews'>


                  {reviews && Object.values(reviews).map(({ User, id, review, updatedAt, userId }) => (
                    <div>
                      <h4 className="date">{User.firstName}</h4>
                      <h5 className="date">{parseDate(updatedAt)}</h5>
                      <p className='reviewParagraph'>{review}</p>
                      {sessionUser && <>
                        {sessionUser.id === User.id && (
                          <div className='deleteReviewButton'>
                            <OpenModalButton className='deleteReviewButton'
                              buttonText="Delete"
                              modalComponent={<DeleteReview toolId={newX} id={id} />}
                            />
                          </div>
                        )}</>}

                    </div>
                  ))}
                </ol>



              </>
            ) : (
              <>
                <div className="ratingSummary">
                  <i class="fa-sharp fa-solid fa-star"></i>
                  <h6>New</h6>
                </div>
                {sessionUser ? (
                  <> {allowPost && <><i class="fa-sharp fa-solid fa-star"></i>
                    <h6>New</h6>
                    <div className='postReviewButton'>
                      <OpenModalButton
                        buttonText="Post Your Review"
                        modalComponent={<CreateReview />}
                      />
                    </div>
                    <h2>{`Be the first to post a review!`}</h2></>}

                  </>
                ) : (<>
                  <i class="fa-sharp fa-solid fa-star"></i>
                  <h6>New</h6></>)}
              </>
            )}



          </div>


        </>
      }
    </>
  );
};

export default ToolPage;