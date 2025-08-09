<a name="module_daylight"></a>

## daylight
Predict the time of sunrise and sunset.
Adapted from https://en.wikipedia.org/wiki/Sunrise_equation

<a name="exp_module_daylight--daylight"></a>

### daylight(date, latitude, longitude) ⇒ <code>Object</code> ⏏
Predict sunrise and sunset times including different types of twilight.

**Kind**: Exported function  
**Returns**: <code>Object</code> - Object containing 8 different times:
- `astronomicalDawn`: Astronomical dawn (sun 18° below horizon)
- `nauticalDawn`: Nautical dawn (sun 12° below horizon)  
- `civilDawn`: Civil dawn (sun 6° below horizon)
- `sunrise`: Sunrise (sun 0.83° below horizon)
- `sunset`: Sunset (sun 0.83° below horizon)
- `civilDusk`: Civil dusk (sun 6° below horizon)
- `nauticalDusk`: Nautical dusk (sun 12° below horizon)
- `astronomicalDusk`: Astronomical dusk (sun 18° below horizon)

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | The date to calculate for |
| latitude | <code>Number</code> | north/south location; -90 (south pole) to 90 (north pole) |
| longitude | <code>Number</code> | east/west location; -180 to 180 |

