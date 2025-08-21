# [1.0.0-beta.8](https://github.com/marcmarine/lulia/compare/v1.0.0-beta.7...v1.0.0-beta.8) (2025-08-21)


### Bug Fixes

* Correct longitude/latitude parameter order in house calc ([65272ce](https://github.com/marcmarine/lulia/commit/65272ce9b0d34bb1d7df1150c4d526e9ba8ca558))


### Features

* Add tz-lookup dependency and convert local time to UTC ([56788ba](https://github.com/marcmarine/lulia/commit/56788ba4d703e599f9634312cbbb9df17e8bb36f))
* Use ISO date strings for dateTime ([23884a3](https://github.com/marcmarine/lulia/commit/23884a33d3e5c604f91a1152a3ee2bf3cf21469c))

# [1.0.0-beta.7](https://github.com/marcmarine/lulia/compare/v1.0.0-beta.6...v1.0.0-beta.7) (2025-07-28)


### Bug Fixes

* Add type interface for builder ([7bdded3](https://github.com/marcmarine/lulia/commit/7bdded3256229c45dc2fdc425cdca66e7cb46dc4))
* Convert ecliptic degrees to zodiac sign and degree ([ac01379](https://github.com/marcmarine/lulia/commit/ac01379f8d80cd037a19b98dfc1af03d762cbc71))
* Correct degree calculation in coordinate conversion ([d7a0b86](https://github.com/marcmarine/lulia/commit/d7a0b865d62fa67102207c3481f1d8bf85ae36fa))


### Features

* Align terminology and improve type definitions ([dd02f96](https://github.com/marcmarine/lulia/commit/dd02f96604e921b0a2adcf0b015c5b9c5ee39646))
* Improve aspects calculation accuracy ([9e94701](https://github.com/marcmarine/lulia/commit/9e947017aba1b7aaa81c8311892c34b6a0e1ac3e))
* Improve builder API by exposing calculated results ([669c1e3](https://github.com/marcmarine/lulia/commit/669c1e3941f3110f5eb5584cc9ae16be93f22842))
* Refactor degree conversion and improve calculation accuracy ([2b3da05](https://github.com/marcmarine/lulia/commit/2b3da0525467261a9de3fd4f5f7f4bbc0ab15145))

# [1.0.0-beta.6](https://github.com/marcmarine/lulia/compare/v1.0.0-beta.5...v1.0.0-beta.6) (2025-07-23)


### Bug Fixes

* Add minute precision to Julian day calculations ([4f4aa57](https://github.com/marcmarine/lulia/commit/4f4aa57d6b28042494b397b1dcda140aa2f05546))
* Update calculations to use validated state ([bf4cd53](https://github.com/marcmarine/lulia/commit/bf4cd53a482e8939ce277fc8fca45568182d5cee))


### Features

* Add builder method for chainable state management ([2ad35e2](https://github.com/marcmarine/lulia/commit/2ad35e2f80c3eca62a787cafe8adbae3e02084fc))

# [1.0.0-beta.5](https://github.com/marcmarine/lulia/compare/v1.0.0-beta.4...v1.0.0-beta.5) (2025-07-21)


### Features

* Add house position calculation for celestial bodies ([7e3626f](https://github.com/marcmarine/lulia/commit/7e3626fde4dc5c6f8fac1286067cb0cb093d7487))
* Improve celestial model data structures ([76cc4b9](https://github.com/marcmarine/lulia/commit/76cc4b93702fc6bf86a1e5e5df5f8d54f89f43bb))
* Make longitude and latitude optional in config ([0fc3446](https://github.com/marcmarine/lulia/commit/0fc3446be88b1bf3ec909afb70c15000f1390fb3))

# [1.0.0-beta.4](https://github.com/marcmarine/lulia/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2025-07-19)


### Features

* Introduce aspect calculation functionality ([a6f7af9](https://github.com/marcmarine/lulia/commit/a6f7af9a9c86be4aa4005e08497acfb4c2f0609f))
* Removes eclipticLongitude from Position type ([d7a5cb4](https://github.com/marcmarine/lulia/commit/d7a5cb4f3a4f222f392ddbe7966056696715b1e9))

# [1.0.0-beta.3](https://github.com/marcmarine/lulia/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2025-07-16)


### Features

* Add calculations of house cuspids ([662181b](https://github.com/marcmarine/lulia/commit/662181b7141d30d9db0e058f84132b07b70d7259))
* Switch engine from swisseph to sweph ([292aa61](https://github.com/marcmarine/lulia/commit/292aa61a9b5154ebee3ed3da402eec89cc716ba8))

# [1.0.0-beta.2](https://github.com/marcmarine/lulia/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2025-01-29)


### Features

* **build:** Provide different exports for `require()` and `import` ([a9cb7f7](https://github.com/marcmarine/lulia/commit/a9cb7f7ded668979652bd402e0e6257d19dd8d2a))

# 1.0.0-beta.1 (2025-01-22)


### Features

* Support individual planetary position calculations ([166ba39](https://github.com/marcmarine/lulia/commit/166ba39428a09af8fb67a6d433721737d2567115))
