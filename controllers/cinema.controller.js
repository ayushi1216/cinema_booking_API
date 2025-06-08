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
        console.log('Hello worl')
        const { cinemaId, seatNumber } = req.body;
        const result = await cinemaService.purchaseSpecificSeat(+cinemaId, +seatNumber);
        console.log(result, 'result')
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}