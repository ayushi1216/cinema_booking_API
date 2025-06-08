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