const express = require('express');
const { ReviewImage } = require('../../db/models');
const { requireAuth, authDeleteReviewImage } = require('../../utils/auth');
const router = express.Router();

/**
 * Route to delete a review image.
 * Requires authentication and authorization to ensure the user can delete the image.
 */
router.delete('/:id', requireAuth, authDeleteReviewImage, async (req, res) => {
    try {
        // Fetch the review image by its ID
        const image = await ReviewImage.findByPk(req.params.id);

        // If the image doesn't exist, return a 404 error
        if (!image) {
            return res.status(404).json({ message: 'Review image not found', statusCode: 404 });
        }

        // Delete the review image from the database
        await image.destroy();

        // Send a success response
        return res.status(200).json({ message: 'Successfully deleted', statusCode: 200 });
    } catch (error) {
        // Log any error that occurs during the deletion process
        console.error('Error deleting review image:', error);

        // Return a 500 Internal Server Error if something goes wrong
        return res.status(500).json({ message: 'Internal Server Error', statusCode: 500 });
    }
});

module.exports = router;
