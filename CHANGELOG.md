# CHANGELOG

## 6.0.0 - 2019-12-31
- New package structure:
	* dist file is "./dist/alawmulaw.js", a UMD served as "main"
	* ES6 source is "./index.js", served as "module"
- Fix: clip mulaw samples after add bias (https://github.com/rochars/alawmulaw/issues/2)

## v5.0.2 (2018-07-08)
- Fix: UMD dist for browsers.

## v5.0.1 (2018-07-08)
- UMD dist transpiled to ES5
- Different mu-Law algorithm; should sound the same.

## v5.0.0 (2018-07-01)
- Add TypeScript declaration
- Using typed arrays for input and ouput
- ES module API changed; export {alaw, mulaw} instead of default alawmulaw

## v4.1.0 (2018-06-25)
- Allow better use of this lib as a dependency:
	- package.json refactored with bundlers and ES6 envs in mind

## v4.0.0 (2018-06-22)
- ES6 module.

## v3.0.0 (2018-06-17)
- New dist file: ./dist/alawmulaw.min.js.