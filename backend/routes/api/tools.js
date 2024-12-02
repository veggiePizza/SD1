const express = require('express');
const { admin, db } = require('../../config/firebase')
const { Tool, Review, Reservation, ToolImage, User, ReviewImage } = require('../../db/models');
const { requireAuth, authIsTool, authIsToolNot, reservationConflict } = require('../../utils/auth');
const router = express.Router();
var Sequelize = require("sequelize");
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


let schema;
if (process.env.NODE_ENV === 'production') {
  schema = process.env.SCHEMA;
}

const validateTool = [
  check('address')
    .notEmpty()
    .withMessage('Street address is required'),
  check('city')
    .notEmpty()
    .withMessage('City is required'),
  check('state')
    .notEmpty()
    .withMessage('State is required'),
  check('country')
    .notEmpty()
    .withMessage('Country is required'),
  check('name')
    .isLength({ max: 49 })
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .notEmpty()
    .withMessage('Description is required'),
  check('price')
    .notEmpty()
    .withMessage('Price per day is required'),
  handleValidationErrors
];

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

const validateDate = [
  check('endDate').custom((value, { req }) => {
    if (new Date(value) > new Date(req.body.startDate)) return true;
    return false;
  })
    .withMessage('endDate cannot be on or before startDate'),
  handleValidationErrors
];

const validateQuery = [
  check('page')
    .optional()
    .isInt({ max: 10, min: 1 })
    .withMessage('Page must be greater than or equal to 1'),
  check('size')
    .optional()
    .isInt({ max: 20, min: 1 })
    .withMessage('Size must be greater than or equal to 1'),
  check('minPrice')
    .optional()
    .isDecimal({ min: 0 })
    .withMessage('Maximum price must be greater than or equal to 0'),
  check('maxPrice')
    .optional()
    .isDecimal({ min: 0 })
    .withMessage('Minimum price must be greater than or equal to 0'),
  handleValidationErrors
];

//Get all Tools
router.get('/', validateQuery, async (req, res) => {
  let { page, size, minPrice, maxPrice } = req.query;
  page = parseInt(page);
  size = parseInt(size);
  minPrice = parseInt(minPrice);
  maxPrice = parseInt(maxPrice);

  if (Number.isNaN(page)) page = 1;
  if (Number.isNaN(size)) size = 20;
  const where = {};

  if (minPrice) where.price = { [Op.gte]: minPrice };
  if (maxPrice) where.price = { [Op.lte]: maxPrice };

  const tools = await Tool.findAll({
    where,
    attributes: {
      include: [
        [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'],
        [Sequelize.literal(
          `(SELECT url FROM ${schema ? `"${schema}"."ToolImages"` : 'ToolImages'
          } WHERE "ToolImages"."toolId" = "Tool"."id" AND "ToolImages"."preview" = true LIMIT 1)`
        ), 'previewImage'],
      ]
    },
    include: [{ model: Review, attributes: [] }, { model: ToolImage, attributes: [] }],
    group: "Tool.id",
    limit: size,
    offset: (page - 1) * size,
    subQuery: false
  });
  if (tools) return res.status(200).json({ Tools: tools, page, size });
});

//Get all Tools owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
  const { user } = req;
  const tools = await Tool.findAll({
    where: { ownerId: user.id },
    attributes: {
      include: [
        [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'],
        [Sequelize.literal(
          `(SELECT url FROM ${schema ? `"${schema}"."ToolImages"` : 'ToolImages'
          } WHERE "ToolImages"."toolId" = "Tool"."id" AND "ToolImages"."preview" = true LIMIT 1)`
        ), 'previewImage'],
      ]
    },
    include: [{ model: Review, attributes: [] }, { model: ToolImage, attributes: [] }],
    group: "Tool.id",
  });


  console.log(`/n/n/n$${tools}`)
  if (tools) return res.status(200).json(tools);
});

//Get details of a Tool from an id
router.get('/:id', async (req, res) => {
  const tool = await Tool.findByPk(req.params.id, {
    attributes: {
      include: [
        [Sequelize.literal(
          `(SELECT COUNT(review) FROM ${schema ? `"${schema}"."Reviews"` : 'Reviews'
          } WHERE "Reviews"."toolId" = "Tool"."id")`
        ), 'numReviews'],
        [Sequelize.literal(
          `(SELECT AVG(stars) FROM ${schema ? `"${schema}"."Reviews"` : 'Reviews'
          } WHERE "Reviews"."toolId" = "Tool"."id")`
        ), 'avgStarRating'],
      ]
    },
    include: [
      { model: Review },
      { model: ToolImage, attributes: ['id', 'url', 'preview'] },
      { model: User, attributes: ['uid'], as: "Owner" }
    ],
    order: [[{ model: ToolImage }, 'id', 'ASC'],
    [{ model: Review }, 'updatedAt', 'DESC']]
  });
  if (tool && tool.Owner) {
    const user = ((await db.collection('Users').doc(tool.Owner.uid).get()).data());

    //console.log(`\n\n\n\nTHis is doct :" ${toolData.Owner.uid}`);
    //console.log(`\n\n\n\nReady to finish: ${user.data()}`)
    tool.Owner.firstName = "user.firstName";
    tool.Owner.email = "user.email";
    tool.Owner.photo = "user.photo";
    return res.status(200).json(tool);
  }
  return res.status(404).json({ message: "Tool couldn't be found", statusCode: 404 })
});

//Create a Tool
router.post('/', requireAuth, validateTool, async (req, res) => {
  const { user } = req;
  const { address, city, state, country, name, description, price } = req.body;
  const newTool = await Tool.create({ owner: user.id, address, city, state, country, name, description, price })
  if (newTool) return res.status(201).json(newTool);
});

//Add an Image to a Tool based on the Tool's id
router.post('/:id/images', requireAuth, authIsTool, async (req, res) => {
  const { url, preview } = req.body;
  const tool = await Tool.findByPk(req.params.id);
  const newToolImage = await ToolImage.create({ url, preview, toolId: tool.id })
  if (newToolImage) return res.status(200).json({ id: newToolImage.id, url: newToolImage.url, preview: newToolImage.preview });
});

//Edit a Tool
router.put('/:id', requireAuth, authIsTool, validateTool, async (req, res) => {
  const { address, city, state, country, name, description, price } = req.body;
  await Tool.update(
    { address, city, state, country, name, description, price },
    { where: { id: req.params.id } })
  const tool = await Tool.findByPk(req.params.id);
  if (tool) return res.status(200).json(tool);
  return res.status(404).json({ message: "Tool couldn't be found", statusCode: 404 });
});

//Delete a Tool
router.delete('/:id', requireAuth, authIsTool, async (req, res) => {
  const tool = await Tool.findByPk(req.params.id);
  if (tool) {
    await tool.destroy();
    return res.status(200).json({ message: "Successfully deleted" });
  }
  return res.status(404).json({ message: "Tool couldn't be found", statusCode: 404 });
});

//Get all Reviews by a Tool's id
router.get('/:id/reviews', async (req, res) => {
  const checkTool = await Tool.findByPk(req.params.id);
  if (checkTool) {
    const reviews = await Review.findAll({
      where: { toolId: req.params.id },
      include: [
        { model: User, attributes: ['id', 'uid'] },
        { model: ReviewImage, attributes: ['id', 'url'] }
      ],
      order: [['updatedAt', 'DESC']]
    });
    return res.status(200).json({ Reviews: reviews });
  }
  else res.status(404).json({ message: "Tool couldn't be found", statusCode: 404 });
});

//Create a Review for a Tool based on the Tool's id
router.post('/:id/reviews', requireAuth, validateReview, async (req, res) => {
  const { review, stars } = req.body;
  const { user } = req;
  const tool = await Tool.findByPk(req.params.id);
  if (tool) {
    const checkExistingReviews = await Review.findOne({ where: { toolId: req.params.id, userId: user.id } });
    if (checkExistingReviews)
      return res.status(403).json({ message: "User already has a review for this tool", statusCode: 403 });
    const newReview = await Review.create({ review, stars, userId: user.id, toolId: tool.id, createdAt: new Date(), updatedAt: new Date() })
    if (newReview) return res.status(201).json(newReview);
  }
  return res.status(404).json({ message: "Tool couldn't be found", statusCode: 404 });
});

//Get all Reservations for a Tool based on the Tool's id
router.get('/:id/reservations', requireAuth, async (req, res) => {
  const tool = await Tool.findByPk(req.params.id);
  if (tool) {
    const { user } = req;
    if (user.id == tool.ownerId)
      reservations = await Reservation.findAll({ where: { toolId: req.params.id }, include: { model: User, attributes: ['id', 'firstName', 'lastName'] } });
    else
      reservations = await Reservation.findAll({ where: { toolId: req.params.id }, attributes: ['toolId', 'startDate', 'endDate'] });
    return res.status(200).json({ Reservations: reservations });
  }
  return res.status(404).json({ message: "Tool couldn't be found", statusCode: 404 });
});

//Create a Reservation from a Tool based on the Tool's id
router.post('/:id/reservations', requireAuth, authIsToolNot, validateDate, reservationConflict, async (req, res) => {
  const { startDate, endDate } = req.body;
  const { user } = req;
  const tool = await Tool.findByPk(req.params.id);
  if (tool) {
    const newReservation = await Reservation.create({ startDate, endDate, userId: user.id, toolId: tool.id })
    if (newReservation) return res.status(200).json(newReservation);
    return res.status(400).json({ message: "Reservation was not created" });
  }
  return res.status(404).json({ message: "Tool couldn't be found", statusCode: 404 });
});

router.get('/:id/images', async (req, res) => {
  const toolImages = await ToolImage.findAll({ where: { toolId: req.params.id } });
  if (toolImages) return res.status(200).json(toolImages);
});

module.exports = router;
