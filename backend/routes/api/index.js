const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use((err, req, res, next) => {
  if(err.errors) return res.status(err.status).json({message:err.message,status:err.status,errors:err.errors})
  return res.status(err.status).json({message:err.message,status:err.status})
})

module.exports = router;