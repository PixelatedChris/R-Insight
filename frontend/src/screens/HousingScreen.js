import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listHousingDetails, createHousingReview } from '../actions/housingActions';
import { HOUSING_CREATE_REVIEW_RESET } from '../constants/housingConstants';
import '../styling/HousingScreen.css';

const HousingScreen = () => {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const housingDetails = useSelector((state) => state.housingDetails);
  const { loading, error, housing } = housingDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const housingReviewCreate = useSelector((state) => state.housingReviewCreate);
  const { success: successHousingReview, error: errorHousingReview } = housingReviewCreate;

  useEffect(() => {
    if (successHousingReview) {
      alert('Review Submitted!');
      setRating(0);
      setComment('');
      dispatch({ type: HOUSING_CREATE_REVIEW_RESET });
    }
    dispatch(listHousingDetails(id));
  }, [dispatch, id, successHousingReview]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createHousingReview(id, { rating, comment }));
  };

  // Construct image path
  const imageName = housing?.title?.toLowerCase().replace(/\s+/g, '_') + '.jpg';
  const imagePath = `/images/${imageName}`;

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              {/* Updated Image Component */}
              <div className="image-container">
              <Image src={imagePath} alt={housing?.title} fluid />
              </div>
            </Col>
            <Col md={6}>
              {/* Container for housing information */}
              <div className="housing-info">
                {/* Title of the housing */}
              <h2>{housing?.title}</h2>
                {/* Rating component showing housing rating and number of reviews */}
              <Rating value={housing?.rating} text={`${housing?.numReviews} reviews`} />
              {/* Description paragraph with a specific class for styling */}
              <p className="housing-description">Description: {housing?.description}</p>
            </div>
              {housing?.countInStock > 0 && (
                <Button className='btn-block' type='button'>
                  Inquire
                </Button>
              )}
            </Col>
          </Row>
          <Row>
            <Col md={12}>
            <div className="review-section">
              <h2>Ratings and Reviews</h2>
              {housing?.reviews?.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {housing?.reviews?.map((review) => (
                  <ListGroup.Item key={review._id} className="review-item">
                    <strong>{review.name}</strong>
                    <div className="review-rating">
                    <Rating value={review.rating} />
                    </div>
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>         
                ))}
                <ListGroup.Item>
                  {errorHousingReview && <Message variant='danger'>{errorHousingReview}</Message>}
                  {userInfo ? (
                    <form className='form' onSubmit={submitHandler}>
                      <h2>Write a Review</h2>
                      <label htmlFor='rating'>Rating</label>
                      <select id='rating' value={rating} onChange={(e) => setRating(e.target.value)}>
                        <option value=''>Select...</option>
                        <option value='1'>1 - Poor</option>
                        <option value='2'>2 - Fair</option>
                        <option value='3'>3 - Good</option>
                        <option value='4'>4 - Very Good</option>
                        <option value='5'>5 - Excellent</option>
                      </select>
                      <label htmlFor='comment'>Comment</label>
                      <textarea id='comment' value={comment} onChange={(e) => setComment(e.target.value)} className="form-control custom-textarea"></textarea>
                      <button className='write-review form button' type='submit'>
                        Submit
                      </button>
                    </form>
                  ) : (
                    <Message className="review-message">
                      Please <Link to='/login'>SIGN IN</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
              </div>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default HousingScreen;