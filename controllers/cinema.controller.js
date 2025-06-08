const cinemaService = require('../services/cinema.service');

exports.createCinema = async (req, res) => {
    try {
        const { totalSeats, cinemaName } = req.body;
        const result = await cinemaService.createCinema(totalSeats, cinemaName);
        res.status(201).json(result);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

exports.purchaseSpecificSeat = async (req, res) => {
    try {
        const { cinemaId, seatNumber } = req.body;
        const result = await cinemaService.purchaseSpecificSeat(+cinemaId, +seatNumber);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.purchaseConsecutiveSeats = async (req, res) => {
    try {
        const { cinemaId } = req.body;
        const result = await cinemaService.purchaseConsecutiveSeats(+cinemaId);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}
