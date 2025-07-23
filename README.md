# Lulia

An easy-to-use interface for astronomical calculations in JavaScript.

[![NPM Version (with dist tag)](https://img.shields.io/npm/v/lulia/beta)](https://www.npmjs.com/package/lulia)
[![View Changelog](https://img.shields.io/badge/view-CHANGELOG.md-white.svg)](https://github.com/marcmarine/lulia/releases)

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
  dateTime: new Date('2025-01-19T12:00:00'),
  longitude: 41.38879,
  latitude: 2.15899
})

const positions = lulia.calculateBodies()
```

This will retrieve an array with position information about celestial bodies. It means for the main ten astronomical bodies.

```js
;[
  {
    name: 'sun',
    longitude: {
      degree: 29,
      minute: 37,
      second: 5,
      decimal: 299.6182666649856
    },
    zodiacSign: 'capricorn',
    isRetrograde: false,
    housePosition: 9
  },
  {
    name: 'moon',
    longitude: {
      degree: 3,
      minute: 42,
      second: 28,
      decimal: 183.7080303933929
    },
    zodiacSign: 'libra',
    isRetrograde: false,
    housePosition: 5
  }
  // ...Rest of bodies
]
```

## Feedback

Feel free to provide any comments. All kinds of contributions are welcome 🚀.
