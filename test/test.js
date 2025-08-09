const assert = require('assert');
const { format } = require('date-fns');
const daylight = require('..');

const formatTime = d => {
    if (!d || isNaN(d.getTime())) {
        return 'N/A';
    }
    return format(d, 'h:mm b');
};

// Downtown Los Angeles
const laTimes = daylight(new Date(), 34.05599620105346, -118.24444289288097);
console.log('Los Angeles times:');
console.log({
    astronomicalDawn: formatTime(laTimes.astronomicalDawn),
    nauticalDawn: formatTime(laTimes.nauticalDawn),
    civilDawn: formatTime(laTimes.civilDawn),
    sunrise: formatTime(laTimes.sunrise),
    sunset: formatTime(laTimes.sunset),
    civilDusk: formatTime(laTimes.civilDusk),
    nauticalDusk: formatTime(laTimes.nauticalDusk),
    astronomicalDusk: formatTime(laTimes.astronomicalDusk)
});

// New York City (Manhattan)
const nycTimes = daylight(new Date(), 40.688027338184405, -73.95775842321324);
console.log('\nNew York City times:');
console.log({
    astronomicalDawn: formatTime(nycTimes.astronomicalDawn),
    nauticalDawn: formatTime(nycTimes.nauticalDawn),
    civilDawn: formatTime(nycTimes.civilDawn),
    sunrise: formatTime(nycTimes.sunrise),
    sunset: formatTime(nycTimes.sunset),
    civilDusk: formatTime(nycTimes.civilDusk),
    nauticalDusk: formatTime(nycTimes.nauticalDusk),
    astronomicalDusk: formatTime(nycTimes.astronomicalDusk)
});

// Debug: Check raw values
console.log('\nDebug - Raw LA times:');
Object.entries(laTimes).forEach(([key, value]) => {
    console.log(`${key}: ${value} (valid: ${value && !isNaN(value.getTime())})`);
});
