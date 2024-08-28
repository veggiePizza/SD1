const express = require('express');
const { ToolImage } = require('../../db/models');
const { requireAuth, authModifyToolImage } = require('../../utils/auth');
const router = express.Router();

//Update an Image (additional route)
router.put('/:id', requireAuth, authModifyToolImage, async (req, res) => {
  const { url } = req.body;
  await ToolImage.update({ url }, { where: { id: req.params.id } })
  const toolImage = await ToolImage.findByPk(req.params.id);
  if (toolImage) return res.status(200).json(toolImage);
});

//Delete a Tool Image
router.delete('/:id', requireAuth, authModifyToolImage, async (req, res) => {
  const image = await ToolImage.findByPk(req.params.id);
    await image.destroy();
    return res.status(200).json({ message: "Successfully deleted" , statusCode: 200 });
});

module.exports = router;