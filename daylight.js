// adapted from https://en.wikipedia.org/wiki/Sunrise_equation

const julian = require('julian');
const {format} = require('date-fns');

const deg2rad = d => d * Math.PI / 180;
const rad2deg = r => r * 180 / Math.PI;
const sin = a => Math.sin(deg2rad(a));
const cos = a => Math.cos(deg2rad(a));
const acos = c => rad2deg(Math.acos(c));

const daylight = (date, latitude, longitude) => {
    const julianDay = Math.floor(+julian(date));
    const n = julianDay - 2451545.0 + 0.0008;
    const J_star = n - longitude / 360;
    const M = (357.5291 + 0.98560028 * J_star) % 360;
    const C = 1.9148 * sin(M) + 0.0200 * sin(2 * M) + 0.0003 * sin(3 * M);
    const ƛ = (M + C + 180 + 102.9372) % 360;
    const 𝛿 = sin(ƛ * sin(23.44));
    const J_transit = 2451545.0 + J_star + 0.0053 * sin(M) - 0.0069 * sin(2 * ƛ);

    // do we need more specialized inverse cos() handling?
    const ω_0 = acos(
        (sin(-0.83) - sin(latitude) * sin(𝛿)) / (cos(latitude) * cos(𝛿))
    );

    const J_rise = J_transit - ω_0/360;
    const J_set  = J_transit + ω_0/360;

    return {rise: julian.toDate(J_rise), set: julian.toDate(J_set)};
};

const formatTime = d => format(d, 'h:mm b')

// Downtown Los Angeles
const {rise, set} = daylight(new Date(), 34.05599620105346, -118.24444289288097);
console.log({rise: formatTime(rise), set: formatTime(set)});
