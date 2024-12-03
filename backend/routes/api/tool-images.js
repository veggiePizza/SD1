const express = require('express');
const { ToolImage } = require('../../db/models');
const { requireAuth, authModifyToolImage } = require('../../utils/auth');
const router = express.Router();

// Update a Tool Image URL
router.put('/:id', requireAuth, authModifyToolImage, async (req, res) => {
  const { url } = req.body;

  try {
    // Update the image URL in the database
    await ToolImage.update({ url }, { where: { id: req.params.id } });

    // Retrieve the updated ToolImage
    const toolImage = await ToolImage.findByPk(req.params.id);

    if (toolImage) {
      // Return the updated ToolImage if it exists
      return res.status(200).json(toolImage);
    } else {
      // If the ToolImage is not found, send a 404 response
      return res.status(404).json({ message: "Tool image not found", statusCode: 404 });
    }
  } catch (error) {
    console.error("Error updating tool image:", error);
    return res.status(500).json({ message: "Internal Server Error", statusCode: 500 });
  }
});

// Delete a Tool Image
router.delete('/:id', requireAuth, authModifyToolImage, async (req, res) => {
  try {
    // Find the tool image by ID
    const image = await ToolImage.findByPk(req.params.id);

    if (!image) {
      // If the image is not found, send a 404 response
      return res.status(404).json({ message: "Tool image not found", statusCode: 404 });
    }

    // Delete the image from the database
    await image.destroy();

    // Return a success response
    return res.status(200).json({ message: "Tool image successfully deleted", statusCode: 200 });
  } catch (error) {
    console.error("Error deleting tool image:", error);
    return res.status(500).json({ message: "Internal Server Error", statusCode: 500 });
  }
});

module.exports = router;
