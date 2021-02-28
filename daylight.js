const julian = require('julian');
const sin = Math.sin;
const cos = Math.cos;

const deg2rad = d => d * Math.PI / 180;

const J_star = (julianDay, longitude) => julianDay - longitude / 360;

const 𝛿 = (julianDay, longitude) => sin(ƛ(julianDay, longitude) * sin(deg2rad(23.44)));

// do we need more specialized inverse cos() handling?
const w_0 = (latitude) => Math.acos(
    (sin(deg2rad(-0.83)) - sin(latitude) * sin(𝛿())) / (cos(latitude) * cos(𝛿()))
);

const M = (julianDay, longitude) => (357.5291 + 0.98560028 * J_star(julianDay, longitude)) % 360;

const C = (julianDay, longitude) => 1.9148 * sin(M(julianDay, longitude)) + 0.0200 * sin(2 * M(julianDay, longitude)) + 0.0003 * sin(3 * M(julianDay, longitude));

const ƛ = (julianDay, longitude) => (M(julianDay, longitude) + C(julianDay, longitude) + 180 + 102.9372) % 360;

const J_transit = (julianDay, longitude) => 2451545.0 + J_star(julianDay, longitude) + 0.0053 * sin(M(julianDay, longitude)) - 0.0069 * sin(2 * ƛ(julianDay, longitude));

const J_rise = (julianDay, latitude, longitude) => J_transit(julianDay, longitude) - w_0(latitude)/360;
const J_set  = (julianDay, latitude, longitude) => J_transit(julianDay, longitude) + w_0(latitude)/360;

// Downtown Los Angeles
console.log(J_set(julian(new Date()), 34.05599620105346, -118.24444289288097));
