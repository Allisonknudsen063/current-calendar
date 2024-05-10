// prediction.js
const pool = require('./db');

async function getTrackedPeriods(userId) {
    return new Promise((resolve, reject) => {
        pool.query('SELECT startDate, endDate FROM trackeddates WHERE userID = ?', [userId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

async function predictNextPeriod(userId) {
    try {
        // Fetch tracked periods from the database
        const trackedPeriods = await getTrackedPeriods(userId);

        // Calculate cycle lengths based on start dates
        const cycleLengths = [];
        for (let i = 1; i < trackedPeriods.length; i++) {
            const currentPeriod = new Date(trackedPeriods[i].startDate);
            const previousPeriod = new Date(trackedPeriods[i - 1].startDate);
            const cycleLength = (currentPeriod - previousPeriod) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
            cycleLengths.push(cycleLength);
        }

        // Calculate average cycle length
        const averageCycleLength = cycleLengths.reduce((acc, curr) => acc + curr, 0) / cycleLengths.length;

        // Predict next period start date
        const lastPeriodEndDate = new Date(trackedPeriods[trackedPeriods.length - 1].endDate);
        const predictedNextPeriodStartDate = new Date(lastPeriodEndDate.getTime() + averageCycleLength * (1000 * 60 * 60 * 24)); // Convert days to milliseconds and add to last period end date

        return predictedNextPeriodStartDate;
    } catch (error) {
        throw error;
    }
}

module.exports = { predictNextPeriod };


