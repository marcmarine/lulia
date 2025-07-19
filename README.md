# Lulia

An easy-to-use interface for astronomical calculations in JavaScript.

[![NPM Version (with dist tag)](https://img.shields.io/npm/v/lulia/beta)](https://www.npmjs.com/package/lulia)

> [!WARNING]
> Beta version - Breaking changes may be possible.

## Installation

```bash
npm install lulia@beta
```

## Basic Usage

Simply create an instance passing the basic configuration including `date` and position `latitude` and `longitude`.

```js
import Lulia from 'lulia'

const lulia = Lulia({
  date: new Date('1813-05-5T12:00:00'),
  latitude: 41.390205,
  longitude: 2.154007
})

const positions = lulia.calculateBodies()

console.log(positions)
```

> [!NOTE]
> Position values will not required in future releases to calculate the positions of the celestial bodies.

This will retrieve an object with position information about celestial bodies. It means for the main ten astronomical bodies.

```js
{
  sun: {
    position: {
      degree: 14,
      minute: 30,
      second: 45,
      longitude: 44.51256755686774
    },
    sign: "taurus",
    retrograde: false
  },
  moon: {
    position: {
      degree: 20,
      minute: 43,
      second: 11,
      longitude: 110.7199096719274
    },
    sign: "cancer",
    retrograde: false
  },
  // ...Rest of bodies
}
```

## Feedback

Feel free to provide any comments. All kinds of contributions are welcome 🚀.
