/**
 * Predict the time of sunrise and sunset.
 * Adapted from https://en.wikipedia.org/wiki/Sunrise_equation
 * @module daylight
 */
export default daylight;

import julian from 'julian';

const deg2rad = d => d * Math.PI / 180;
const rad2deg = r => r * 180 / Math.PI;
const sin = a => Math.sin(deg2rad(a));
const cos = a => Math.cos(deg2rad(a));
const acos = c => rad2deg(Math.acos(c));
const asin = c => rad2deg(Math.asin(c));

/**
 * Predict sunrise and sunset times including different types of twilight.
 * @alias module:daylight
 * @param {Date} date - The date to calculate for
 * @param {Number} latitude - north/south location; -90 (south pole) to 90 (north pole)
 * @param {Number} longitude - east/west location; -180 to 180
 * @returns {Object} Object containing 8 different times:
 *   - astronomicalDawn: Astronomical dawn (sun 18° below horizon)
 *   - nauticalDawn: Nautical dawn (sun 12° below horizon)
 *   - civilDawn: Civil dawn (sun 6° below horizon)
 *   - sunrise: Sunrise (sun 0.83° below horizon)
 *   - sunset: Sunset (sun 0.83° below horizon)
 *   - civilDusk: Civil dusk (sun 6° below horizon)
 *   - nauticalDusk: Nautical dusk (sun 12° below horizon)
 *   - astronomicalDusk: Astronomical dusk (sun 18° below horizon)
 */
function daylight(date, latitude, longitude) {
    const julianDay = Math.floor(+julian(date));
    const n = julianDay - 2451545.0 + 0.0008;
    const J_star = n - longitude / 360;
    const M = (357.5291 + 0.98560028 * J_star) % 360;
    const C = 1.9148 * sin(M) + 0.0200 * sin(2 * M) + 0.0003 * sin(3 * M);
    const ƛ = (M + C + 180 + 102.9372) % 360;
    const 𝛿 = asin(sin(ƛ) * sin(23.44));
    const J_transit = 2451545.0 + J_star + 0.0053 * sin(M) - 0.0069 * sin(2 * ƛ);

    // Calculate times for different sun altitudes
    const calculateTime = (sunAltitude) => {
        const ω_0 = acos(
            (sin(sunAltitude) - sin(latitude) * sin(𝛿)) / (cos(latitude) * cos(𝛿))
        );
        return {
            rise: julian.toDate(J_transit - ω_0/360),
            set: julian.toDate(J_transit + ω_0/360)
        };
    };

    const astronomical = calculateTime(-18);
    const nautical = calculateTime(-12);
    const civil = calculateTime(-6);
    const sunrise = calculateTime(-0.83);

    return {
        astronomicalDawn: astronomical.rise,
        nauticalDawn: nautical.rise,
        civilDawn: civil.rise,
        sunrise: sunrise.rise,
        sunset: sunrise.set,
        civilDusk: civil.set,
        nauticalDusk: nautical.set,
        astronomicalDusk: astronomical.set
    };
};
