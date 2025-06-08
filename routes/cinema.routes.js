const express = require('express');
const router = express.Router();
const cinemaController = require('../controllers/cinema.controller');

router.post('/', cinemaController.createCinema);
router.post('/seats/purchase', cinemaController.purchaseSpecificSeat);
router.post('/seats/purchase-consecutive', cinemaController.purchaseConsecutiveSeats);

module.exports = router;
