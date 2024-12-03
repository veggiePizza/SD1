
const express = require('express');
const { Tool, Review, ToolImage, User } = require('../../db/models');
const { requireAuth, authenticateUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const Sequelize = require('sequelize');
const router = express.Router();

// Optional schema for production environment
const schema = process.env.NODE_ENV === 'production' ? process.env.SCHEMA : null;

// Validation middlewares
const validateTool = [
  check('address').notEmpty().withMessage('Street address is required'),
  check('city').notEmpty().withMessage('City is required'),
  check('state').notEmpty().withMessage('State is required'),
  check('country').notEmpty().withMessage('Country is required'),
  check('name').isLength({ max: 49 }).withMessage('Name must be less than 50 characters'),
  check('description').notEmpty().withMessage('Description is required'),
  check('price').notEmpty().withMessage('Price per day is required'),
  handleValidationErrors,
];

const validateQuery = [
  check('page').optional().isInt({ min: 1 }).withMessage('Page must be greater than or equal to 1'),
  check('size').optional().isInt({ min: 1 }).withMessage('Size must be greater than or equal to 1'),
  check('minPrice').optional().isDecimal({ min: 0 }).withMessage('Minimum price must be greater than or equal to 0'),
  check('maxPrice').optional().isDecimal({ min: 0 }).withMessage('Maximum price must be greater than or equal to 0'),
  handleValidationErrors,
];

// Create a Tool
router.post('/', authenticateUser, validateTool, async (req, res) => {
  const { user } = req;
  const { address, city, state, country, name, description, price } = req.body;

  // Log the user ID (Firebase UID) to ensure it's correctly passed
  console.log('User ID (ownerId):', user.id); // Log the Firebase UID

  try {
    const newTool = await Tool.create({
      ownerId: user.id,
      address,
      city,
      state,
      country,
      name,
      description,
      price
    });

    // Log the newly created tool object to ensure it was successfully created
    console.log('New Tool:', newTool);  // Log the tool data

    return res.status(201).json(newTool);

  } catch (error) {
    console.error('Error creating tool:', error); // Log the error if creation fails
    return res.status(500).json({ message: 'Failed to create tool', statusCode: 500 });
  }
});

// Get all Tools with pagination, filters, and search
router.get('/', authenticateUser, validateQuery, async (req, res) => {
  let { page, size, minPrice, maxPrice, query } = req.query;
  page = parseInt(page) || 1;
  size = parseInt(size) || 20;

  const where = {};
  if (minPrice) where.price = { [Sequelize.Op.gte]: minPrice };
  if (maxPrice) where.price = { [Sequelize.Op.lte]: maxPrice };
  if (query) where.name = { [Sequelize.Op.like]: `%${query}%` };

  try {
    const tools = await Tool.findAll({
      where,
      attributes: {
        include: [
          [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'],
          [Sequelize.literal(
              `(SELECT url FROM ${schema ? `"${schema}"."ToolImages"` : 'ToolImages'} WHERE "ToolImages"."toolId" = "Tool"."id" AND "ToolImages"."preview" = true LIMIT 1)`
          ), 'previewImage'],
        ]
      },
      include: [{ model: Review, attributes: [] }, { model: ToolImage, attributes: [] }],
      group: 'Tool.id',
      limit: size,
      offset: (page - 1) * size,
      subQuery: false
    });

    return res.status(200).json({ Tools: tools, page, size });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to fetch tools', statusCode: 500 });
  }
});

// Get all Tools owned by the current user
router.get('/current', authenticateUser, async (req, res) => {
  const { user } = req;

  if (!user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const tools = await Tool.findAll({
      where: { ownerId: user.id },
      attributes: {
        include: [
          [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'],
          [Sequelize.literal(
              `(SELECT url FROM ${schema ? `"${schema}"."ToolImages"` : 'ToolImages'} WHERE "ToolImages"."toolId" = "Tool"."id" AND "ToolImages"."preview" = true LIMIT 1)`
          ), 'previewImage'],
        ]
      },
      include: [{ model: Review, attributes: [] }, { model: ToolImage, attributes: [] }],
      group: 'Tool.id',
    });

    return res.status(200).json(tools);
  } catch (error) {
    console.error('Error fetching tools:', error);  // Log the error for debugging
    return res.status(500).json({ message: 'Failed to fetch tools', statusCode: 500 });
  }
});

// Get details of a specific Tool
router.get('/:id', async (req, res) => {
  try {
    const tool = await Tool.findByPk(req.params.id, {
      attributes: {
        include: [
          [Sequelize.literal(
              `(SELECT COUNT(review) FROM ${schema ? `"${schema}"."Reviews"` : 'Reviews'} WHERE "Reviews"."toolId" = "Tool"."id")`
          ), 'numReviews'],
          [Sequelize.literal(
              `(SELECT AVG(stars) FROM ${schema ? `"${schema}"."Reviews"` : 'Reviews'} WHERE "Reviews"."toolId" = "Tool"."id")`
          ), 'avgStarRating'],
        ]
      },
      include: [
        { model: Review },
        { model: ToolImage, attributes: ['id', 'url', 'preview'] },
        { model: User, attributes: ['id', 'firstName', 'lastName'], as: 'Owner' }
      ],
      order: [
        [{ model: ToolImage }, 'id', 'ASC'],
        [{ model: Review }, 'updatedAt', 'DESC']
      ]
    });

    if (tool) {
      return res.status(200).json(tool);
    }

    return res.status(404).json({ message: "Tool couldn't be found", statusCode: 404 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to fetch tool details', statusCode: 500 });
  }
});

// Edit a Tool
router.put('/:toolId', authenticateUser, async (req, res) => {
  const { user } = req;
  const { toolId } = req.params;
  const { address, city, state, country, name, description, price } = req.body;

  try {
    // Find the tool by ID
    const tool = await Tool.findByPk(toolId);

    // Check if the tool exists and belongs to the authenticated user
    if (!tool || tool.ownerId !== user.id) {
      return res.status(404).json({ message: 'Tool not found or you do not have permission to edit this tool', statusCode: 404 });
    }

    // Update the tool details
    tool.address = address || tool.address;
    tool.city = city || tool.city;
    tool.state = state || tool.state;
    tool.country = country || tool.country;
    tool.name = name || tool.name;
    tool.description = description || tool.description;
    tool.price = price || tool.price;

    // Save the updated tool
    await tool.save();

    // Return the updated tool
    return res.status(200).json(tool);
  } catch (error) {
    console.error('Error updating tool:', error); // Log the error for debugging
    return res.status(500).json({ message: 'Failed to update tool', statusCode: 500 });
  }
});

// Delete a tool
router.delete('/:toolId', authenticateUser, async (req, res) => {
  const { user } = req; // Extract user from the request after authentication
  const { toolId } = req.params; // Get the toolId from the URL params

  try {
    // Find the tool by ID
    const tool = await Tool.findByPk(toolId);

    // Check if the tool exists
    if (!tool) {
      return res.status(404).json({ message: 'Tool not found', statusCode: 404 });
    }

    // Check if the authenticated user is the owner of the tool
    if (tool.ownerId !== user.id) {
      return res.status(403).json({ message: 'You do not have permission to delete this tool', statusCode: 403 });
    }

    // Delete the tool from the database
    await tool.destroy();

    // Return success message
    return res.status(200).json({ message: 'Tool deleted successfully' });
  } catch (error) {
    console.error('Error deleting tool:', error); // Log the error for debugging
    return res.status (500).json({ message: 'An error occurred while deleting the tool', statusCode: 500 });
  }
});

module.exports = router;

// Create a Tool
// router.post('/', authenticateUser, validateTool, async (req, res) => {
//   const { user } = req; // The user object was added by the authenticateUser middleware
//   console.log('Authenticated user:', user);
//
//   if (!user) {
//     return res.status(401).json({ message: 'Unauthorized - user not found' });
//   }
//
//   const { address, city, state, country, lat, lng, name, description, price } = req.body;
//
//   try {
//     // Check if the user exists in Firestore (if needed)
//     const userRef = db.collection('users').doc(user.uid);
//     console.log('User document path:', userRef.path);
//     const userDoc = await userRef.get();
//
//     if (!userDoc.exists) {
//       console.error('User document does not exist:', userRef.path);
//       return res.status(400).json({ message: 'User not found in the database' });
//     }
//
//     // Create a new tool document in Firestore
//     const toolRef = db.collection('tools').doc();
//     console.log('Creating tool document at path:', toolRef.path);
//     await toolRef.set({
//       ownerId: user.uid,
//       address,
//       city,
//       state,
//       country,
//       lat,
//       lng,
//       name,
//       description,
//       price,
//       createdAt: admin.firestore.FieldValue.serverTimestamp(),
//     });
//
//     // Respond with the newly created tool's ID
//     return res.status(201).json({ message: 'Tool added successfully', toolId: toolRef.id });
//   } catch (error) {
//     console.error('Error creating tool:', error);
//     return res.status(500).json({ message: 'Server Error', error: error.message });
//   }
// });

// Create a Tool
// router.post('/', authenticateUser, validateTool, async (req, res) => {
//  // console.log(Tool Req: ${req.body.address})
//   const { user } = req;
//   const { address, city, state, country, lat, lng, name, description, price } = req.body;
//   const newTool = await Tool.create({ owner: user.uid, address, city, state, country, lat, lng, name, description, price })
//   if (newTool) return res.status(201).json(newTool);
// });

// Create a Tool
// router.post('/', authenticateUser, validateTool, async (req, res) => {
//   const { user } = req;
//   const { address, city, state, country, lat, lng, name, description, price } = req.body;
//
//   try {
//     const newTool = await Tool.create({
//       owner: user.uid,
//       address,
//       city,
//       state,
//       country,
//       lat,
//       lng,
//       name,
//       description,
//       price
//     });
//
//     if (newTool) {
//       return res.status(201).json(newTool); // Return the newly created tool
//     } else {
//       return res.status(400).json({ message: 'Error creating tool' });
//     }
//   } catch (error) {
//     console.error('Error creating tool:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });



// Add an Image to a Tool based on the Tool's id
// router.post('/:id/images', requireAuth, authIsTool, async (req, res) => {
//   const { url, preview } = req.body;
//   const tool = await Tool.findByPk(req.params.id);
//   const newToolImage = await ToolImage.create({ url, preview, toolId: tool.id })
//   if (newToolImage) return res.status(200).json({ id: newToolImage.id, url: newToolImage.url, preview: newToolImage.preview });
// });

// Edit a Tool
// router.put('/:id', requireAuth, authIsTool, validateTool, async (req, res) => {
//   const { address, city, state, country, name, description, price } = req.body;
//   await Tool.update(
//       { address, city, state, country, name, description, price },
//       { where: { id: req.params.id } })
//   const tool = await Tool.findByPk(req.params.id);
//   if (tool) return res.status(200).json(tool);
//   return res.status(404).json({ message: "Tool couldn't be found", statusCode: 404 });
// });

// Delete a Tool
// router.delete('/:id', requireAuth, authIsTool, async (req, res) => {
//   const tool = await Tool.findByPk(req.params.id);
//   if (tool) {
//     await tool.destroy();
//     return res.status(200).json({ message: "Successfully deleted" });
//   }
//   return res.status(404).json({ message: "Tool couldn't be found", statusCode: 404 });
// });

// Get all Reviews by a Tool's id
// router.get('/:id/reviews', async (req, res) => {
//   const checkTool = await Tool.findByPk(req.params.id);
//   if (checkTool) {
//     const reviews = await Review.findAll({
//       where: { toolId: req.params.id },
//       include: [
//         { model: User, attributes: ['id', 'uid'] },
//         { model: ReviewImage, attributes: ['id', 'url'] }
//       ],
//       order: [['updatedAt', 'DESC']]
//     });
//     return res.status(200).json({ Reviews: reviews });
//   }
//   else res.status(404).json({ message: "Tool couldn't be found", statusCode: 404 });
// });

// Create a Review for a Tool based on the Tool's id
// router.post('/:id/reviews', requireAuth, validateReview, async (req, res) => {
//   const { review, stars } = req.body;
//   const { user } = req;
//   const tool = await Tool.findByPk(req.params.id);
//   if (tool) {
//     const checkExistingReviews = await Review.findOne({ where: { toolId: req.params.id, userId: user.id } });
//     if (checkExistingReviews)
//       return res.status(403).json({ message: "User already has a review for this tool", statusCode: 403 });
//     const newReview = await Review.create({ review, stars, userId: user.id, toolId: tool.id, });
//
//     if (newReview) {
//       const newReviewWithUser = await Review.findOne({
//         where: { id: newReview.id },
//         include: [{ model: User, attributes: ['id', 'uid'] },
//           { model: ReviewImage, attributes: ['id', 'url'] }
//         ]
//       });
//       return res.status(201).json(newReviewWithUser);
//     }
//   }
//   return res.status(404).json({ message: "Tool couldn't be found", statusCode: 404 });
// });

// Get all Reservations for a Tool based on the Tool's id
// router.get('/:id/reservations', async (req, res) => {
//   const checkTool = await Tool.findByPk(req.params.id);
//   if (checkTool) {
//     const reservations = await Reservation.findAll({
//       where: { toolId: req.params.id },
//       include: [{ model: User, attributes: ['id', 'uid'] }],
//       order: [['updatedAt', 'DESC']]
//     });
//     return res.status(200).json({ Reservations: reservations });
//   }
//   else res.status(404).json({ message: "Tool couldn't be found", statusCode: 404 });
// });

// Reserve a Tool
// router.post('/:id/reservations', requireAuth, validateDate, reservationConflict, async (req, res) => {
//   const { startDate, endDate } = req.body;
//   const { user } = req;
//   const tool = await Tool.findByPk(req.params.id);
//   if (tool) {
//     const newReservation = await Reservation.create({ userId: user.id, toolId: tool.id, startDate, endDate });
//     return res.status(201).json(newReservation);
//   }
//   return res.status(404).json({ message: "Tool couldn't be found", statusCode: 404 });
// });
