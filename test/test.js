const assert = require('assert');
const format = require('date-fns');
const daylight = require('..');

const formatTime = d => format(d, 'h:mm b');

// Downtown Los Angeles
const {rise, set} = daylight(new Date(), 34.05599620105346, -118.24444289288097);
console.log({rise: formatTime(rise), set: formatTime(set)});
