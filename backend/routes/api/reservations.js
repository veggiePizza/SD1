const express = require('express');
const { Reservation, Tool } = require('../../db/models');
const { requireAuth, authReservation, authDeleteReservation, reservationConflict2 } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const router = express.Router();

const validateDate = [
  check('endDate').custom((value, { req }) => {
    if (new Date(value) > new Date(req.body.startDate)) return true;
    return false;
  })
    .withMessage('endDate cannot be on or before startDate'),
  handleValidationErrors
];

//Get all of the Current User's Reservations
router.get('/current', requireAuth, async (req, res) => {
  const { user } = req;
  const reservations = await Reservation.findAll({
    where: { userId: user.id },
    attributes: ['id', 'toolId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
    include: [{ model: Tool, attributes: { exclude: ['createdAt', 'updatedAt', 'description'] } }],
  });
  if (reservations) return res.status(200).json({Reservations: reservations});
  return res.status(404).json({ message: "Reservations couldn't be found", status: 404 })
});

//Edit a Reservation
router.put('/:id', requireAuth, authReservation, validateDate, reservationConflict2, async (req, res) => {
  const { startDate, endDate } = req.body;
  await Reservation.update({ startDate, endDate }, { where: { id: req.params.id } });
  const reservation = await Reservation.findByPk(req.params.id);
  if (reservation) return res.status(200).json(reservation);
});

//Delete a Reservation
router.delete('/:id', requireAuth, authDeleteReservation, async (req, res) => {
  const reservation = await Reservation.findByPk(req.params.id);
  await reservation.destroy();
  return res.status(200).json({ message: "Successfully deleted", statusCode: 200 });
});

module.exports = router;