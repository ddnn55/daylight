const julian = require('julian');
const sin = Math.sin;
const cos = Math.cos;

const J_star = (julianDay, longitude) => julianDay - longitude / 360;

// do we need more specialized inverse cos() handling?
const w_0 = (latitude) => Math.acos(
    (sin(deg2rad(-0.83)) - sin(latitude) * sin(𝛿())) / (cos(latitude) * cos(𝛿()))
);

const J_transit = (julianDay, longitude) => 2451545.0 + J_star(julianDay, longitude) + 0.0053 * sin(M()) - 0.0069 * sin(2 * ƛ());

const J_rise = (julianDay, latitude, longitude) => J_transit(julianDay, longitude) - w_0(latitude)/360;
const J_set  = (julianDay, latitude, longitude) => J_transit(julianDay, longitude) + w_0(latitude)/360;

// Downtown Los Angeles
console.log(J_set(julian(new Date()), 34.05599620105346, -118.24444289288097));
