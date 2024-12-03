const express = require('express');
const { Reservation, Tool } = require('../../db/models');
const { requireAuth, authReservation, authDeleteReservation, reservationConflict2, authenticateUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const router = express.Router();

// Validation for date fields: Ensure endDate is after startDate
const validateDate = [
  check('endDate')
      .custom((value, { req }) => {
        if (new Date(value) > new Date(req.body.startDate)) return true;
        return false;
      })
      .withMessage('endDate cannot be on or before startDate'),
  handleValidationErrors
];

// Create a new reservation
router.post('/', authenticateUser, validateDate, reservationConflict2, async (req, res) => {
  const { toolId, startDate, endDate } = req.body;
  const { user } = req;

  try {
    const tool = await Tool.findByPk(toolId);
    if (!tool) {
      return res.status(404).json({ message: "Tool not found", status: 404 });
    }

    const reservation = await Reservation.create({
      toolId,
      userId: user.id,
      startDate,
      endDate
    });

    return res.status(201).json(reservation);
  } catch (error) {
    console.error('Error creating reservation:', error);
    return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
});

// Get all current user's reservations
router.get('/current', authenticateUser, async (req, res) => {
  const { user } = req;

  try {
    const reservations = await Reservation.findAll({
      where: { userId: user.id },
      attributes: ['id', 'toolId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
      include: [{
        model: Tool,
        attributes: { exclude: ['createdAt', 'updatedAt', 'description'] }
      }],
    });

    if (reservations && reservations.length > 0) {
      return res.status(200).json({ Reservations: reservations });
    }

    return res.status(404).json({ message: "Reservations couldn't be found", status: 404 });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
});

// Get a reservation by ID
router.get('/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findOne({
      where: { id, userId: req.user.id }, // Ensure the user is authorized to view this reservation
      attributes: ['id', 'toolId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
      include: [{
        model: Tool,
        attributes: { exclude: ['createdAt', 'updatedAt', 'description'] }
      }],
    });

    if (reservation) {
      return res.status(200).json(reservation);
    } else {
      return res.status(404).json({ message: 'Reservation not found', status: 404 });
    }
  } catch (error) {
    console.error('Error fetching reservation by ID:', error);
    return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
});

// Edit a reservation (update start and end date)
router.put('/:id', authenticateUser, authReservation, validateDate, reservationConflict2, async (req, res) => {
  const { toolId, startDate, endDate } = req.body;

  try {
    // Check if the reservation exists and belongs to the authenticated user
    const reservation = await Reservation.findByPk(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // Check if the reservation belongs to the current authenticated user
    if (reservation.userId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    // Update the reservation with the new values
    await Reservation.update({ toolId, startDate, endDate }, { where: { id: req.params.id } });

    // Fetch the updated reservation from the database
    const updatedReservation = await Reservation.findByPk(req.params.id);

    if (updatedReservation) {
      return res.status(200).json(updatedReservation);
    } else {
      return res.status(404).json({ message: 'Updated reservation not found' });
    }
  } catch (error) {
    console.error('Error updating reservation:', error);
    return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
});

// Delete a reservation
router.delete('/:id', requireAuth, authDeleteReservation, async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);

    if (reservation) {
      await reservation.destroy();
      return res.status(200).json({ message: "Successfully deleted", statusCode: 200 });
    } else {
      return res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (error) {
    console.error('Error deleting reservation:', error);
    return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
});

module.exports = router;

