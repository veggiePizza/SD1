const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const toolsRouter = require('./tools.js');
const reservationsRouter = require('./reservations.js');
const reviewsRouter = require('./reviews.js');
const toolImagesRouter = require('./tool-images.js');
const reviewImagesRouter = require('./review-images.js');
const staticImagesRouter = require('./images.js')
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/firebase', sessionRouter);
router.use('/users', usersRouter);
router.use('/tools', toolsRouter);

router.use('/images', staticImagesRouter);

router.use('/reservations', reservationsRouter);
router.use('/reviews', reviewsRouter);
router.use('/tool-images', toolImagesRouter);
router.use('/review-images', reviewImagesRouter);
router.use((err, req, res, next) => {
  res.status(err.status).json({message:err.message,status:err.status})
})

module.exports = router;