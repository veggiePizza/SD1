const express = require('express');
const { Tool, Review, ToolImage, User, ReviewImage } = require('../../db/models');
const { requireAuth, authReview } = require('../../utils/auth');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// Schema selection based on the environment
let schema;
if (process.env.NODE_ENV === 'production') {
  schema = process.env.SCHEMA;
}

// Validation middleware for creating or updating reviews
const validateReview = [
  check('review')
      .notEmpty()
      .withMessage('Review text is required'),
  check('stars')
      .notEmpty()
      .isInt({ max: 5, min: 1 })
      .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

// Get all reviews of the current user
router.get('/current', requireAuth, async (req, res) => {
  const { user } = req;

  try {
    // Fetch all reviews written by the authenticated user
    const reviews = await Review.findAll({
      where: { userId: user.id },
      include: [
        { model: User, attributes: ['id', 'firstName', 'lastName'] },
        {
          model: Tool,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: [{ model: ToolImage, attributes: ['url'] }],
          attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'name', 'price'],
        },
        { model: ReviewImage, attributes: ['id', 'url'] },
      ],
    });

    // Return reviews if found
    return res.status(200).json({ Reviews: reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return res.status(500).json({ message: 'Internal Server Error', statusCode: 500 });
  }
});

// Add an image to a review
router.post('/:id/images', requireAuth, authReview, async (req, res) => {
  const { url } = req.body;

  try {
    // Find the review by ID
    const review = await Review.findByPk(req.params.id);

    // Check if there are already less than 10 images for the review
    const reviewImages = await ReviewImage.findAll({ where: { reviewId: req.params.id } });

    if (reviewImages.length < 10) {
      // Create a new review image
      const newImage = await ReviewImage.create({ url, reviewId: review.id });
      return res.status(200).json({ id: newImage.id, url: newImage.url });
    } else {
      // Return an error if the maximum number of images is reached
      return res.status(403).json({ message: "Maximum number of images for this resource was reached", statusCode: 403 });
    }
  } catch (error) {
    console.error('Error adding image to review:', error);
    return res.status(500).json({ message: 'Internal Server Error', statusCode: 500 });
  }
});

// Edit a review (update review text and stars)
router.put('/:id', requireAuth, authReview, validateReview, async (req, res) => {
  const { review, stars } = req.body;

  try {
    // Update the review in the database
    await Review.update({ review, stars }, { where: { id: req.params.id } });

    // Fetch the updated review
    const newReview = await Review.findByPk(req.params.id);
    return res.status(200).json(newReview);
  } catch (error) {
    console.error('Error updating review:', error);
    return res.status(500).json({ message: 'Internal Server Error', statusCode: 500 });
  }
});

// Delete a review
router.delete('/:id', requireAuth, authReview, async (req, res) => {
  try {
    // Find and delete the review by ID
    const review = await Review.findByPk(req.params.id);

    if (review) {
      await review.destroy();
      return res.status(200).json({ message: "Successfully Deleted", statusCode: 200 });
    } else {
      return res.status(404).json({ message: 'Review not found', statusCode: 404 });
    }
  } catch (error) {
    console.error('Error deleting review:', error);
    return res.status(500).json({ message: 'Internal Server Error', statusCode: 500 });
  }
});

// Get all images associated with a review
router.get('/:id/images', async (req, res) => {
  try {
    // Fetch all images for the specific review
    const images = await ReviewImage.findAll({ where: { reviewId: req.params.id } });

    if (images.length > 0) {
      return res.status(200).json(images);
    } else {
      return res.status(404).json({ message: 'No images found for this review', statusCode: 404 });
    }
  } catch (error) {
    console.error('Error fetching review images:', error);
    return res.status(500).json({ message: 'Internal Server Error', statusCode: 500 });
  }
});

module.exports = router;
