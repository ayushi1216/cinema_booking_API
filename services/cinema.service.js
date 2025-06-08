const db = require('../models')
const { Cinema, Seat, sequelize } = db;


exports.createCinema = async (totalSeats, cinemaName) => {
    return await sequelize.transaction(async (t) => {

        // check if cinema already exists
        const existing = await Cinema.findOne({ where: { cinemaName }, transaction: t })
        if (existing) {
            throw new Error("Cinema with this name already exists.");
        }
        const cinema = await Cinema.create({ totalSeats, cinemaName }, { transaction: t });

        const seats = Array.from({ length: totalSeats }, (_, i) => ({
            cinemaId: cinema.id,
            seatNumber: i + 1,
            isBooked: false,
        }));

        await Seat.bulkCreate(seats, { transaction: t });

        return { cinema: cinema.id, cinemaName: cinema.cinemaName };
    });
};



