(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.daylight = factory());
}(this, (function () { 'use strict';

  var julian = convert;
  var toDate = convertToDate;

  var toJulianDay_1 = toJulianDay;
  var toMillisecondsInJulianDay_1 = toMillisecondsInJulianDay;
  var fromJulianDayAndMilliseconds_1 = fromJulianDayAndMilliseconds;

  var DAY = 86400000;
  var HALF_DAY = DAY / 2;
  var UNIX_EPOCH_JULIAN_DATE = 2440587.5;
  var UNIX_EPOCH_JULIAN_DAY = 2440587;

  function convert(date) {
    return (toJulianDay(date) + (toMillisecondsInJulianDay(date) / DAY)).toFixed(6);
  }
  function convertToDate(julian) {
    return new Date((Number(julian) - UNIX_EPOCH_JULIAN_DATE) * DAY);
  }
  function toJulianDay(date) {
    return ~~((+date + HALF_DAY) / DAY) + UNIX_EPOCH_JULIAN_DAY;
  }
  function toMillisecondsInJulianDay(date) {
    return (+date + HALF_DAY) % DAY;
  }
  function fromJulianDayAndMilliseconds(day, ms) {
    return (day - UNIX_EPOCH_JULIAN_DATE) * DAY + ms;
  }julian.toDate = toDate;
  julian.toJulianDay = toJulianDay_1;
  julian.toMillisecondsInJulianDay = toMillisecondsInJulianDay_1;
  julian.fromJulianDayAndMilliseconds = fromJulianDayAndMilliseconds_1;

  /**
   * Predict the time of sunrise and sunset.
   * Adapted from https://en.wikipedia.org/wiki/Sunrise_equation
   * @module daylight
   */

  const deg2rad = d => d * Math.PI / 180;
  const rad2deg = r => r * 180 / Math.PI;
  const sin = a => Math.sin(deg2rad(a));
  const cos = a => Math.cos(deg2rad(a));
  const acos = c => rad2deg(Math.acos(c));

  /**
   * Predict sunrise and sunset.
   * @alias module:daylight
   * @param {Date}
   * @param {Number} - north/south location; -90 (south pole) to 90 (north pole)
   * @param {Number} - east/west location; -180 to 180
   * @returns {{rise: Date, set: Date}} Predicted time of sunrise and sunset
   */
  function daylight(date, latitude, longitude) {
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
  }

  return daylight;

})));
