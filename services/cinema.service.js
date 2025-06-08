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

// For purchasing two Consecutive (Nearby Seats) in Cinema
exports.purchaseConsecutiveSeats = async (cinemaId) => {
    return await sequelize.transaction(async (t) => {
        const seats = await Seat.findAll({
            where: {
                cinemaId,
                isBooked: false,
            },
            order: [['seatNumber', 'ASC']],
            lock: t.LOCK.UPDATE,
            transaction: t,
        });

        // Iterating through all seats, to check consecutive (not booked) seats
        for (let i = 0; i < seats.length - 1; i++) {
            const curr = seats[i];
            const next = seats[i + 1];

            if (next.seatNumber === curr.seatNumber + 1) {

                curr.isBooked = true;
                next.isBooked = true;

                await curr.save({ transaction: t });
                await next.save({ transaction: t });

                return {
                    seatNumbers: [curr.seatNumber, next.seatNumber],
                    message: 'Consecutive Seats booked successfully',
                };
            }
        }

        throw new Error('No two consectutive seats availiable !!')

    });
}

