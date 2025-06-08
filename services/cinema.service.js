const { where } = require('sequelize');
const db = require('../models')
const { Cinema, Seat, sequelize } = db;

//  To Create a CINEMA
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

// For Purchasing Specific Seat in Cinema
exports.purchaseSpecificSeat = async (cinemaId, seatNumber) => {
    return await sequelize.transaction(async (t) => {
        // Get that seat
        const seat = await Seat.findOne({
            where: {
                cinemaId,
                seatNumber,
                isBooked: false
            },
            lock: t.LOCK.UPDATE,
            transaction: t
        });

        //  If seat is booked or do not exists
        if (!seat) {
            throw new Error(`Seat ${seatNumber} is already booked or not available`);
        }

        seat.isBooked = true;
        await seat.save({ transaction: t, logging: console.log })

        return { seatNumber: seat.seatNumber, message: 'Seat booked successfully' };
    });
};



