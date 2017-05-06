# stylelint-no-browser-hacks

[![Build Status][ci-img]][ci]
[![Latest version][npm-v-img]][npm]
[![Dependency Status][gemnasium-img]][gemnasium]
[![Downloads][npm-d-img]][npm]

A [stylelint] plugin that disallow browser hacks that are irrelevant to the
browsers you are targeting, using [stylehacks].

Original rule: [stylelint/no-browser-hacks][original-rule].

Disallow browser hacks that are irrelevant to the browsers you are targeting.

```css
h1 { _color: white; }
/**  ↑
 * Hacks like this */
```

If you are uncertain what "browser hacks" are, ["An Introduction to
Browser-Specific Hacks"][sitepoint-browser-specific-css-hacks]
explains it well.

This rule uses [stylehacks] to detect the hacks. Then, in the spirit of
stylelint, it tells you that you've done something wrong. If instead you would
like to automatically remove browser hacks, use [stylehacks] directly.

[stylehacks] is only compatible with standard CSS syntax, and does not support
nested properties nor custom property sets.

Bugs and feature requests should be reported on the
[stylehacks issue tracker][stylehacks-issues].

## Installation

```
npm install stylelint-no-browser-hacks
```

## Usage

Add `stylelint-no-browser-hacks` to your stylelint config plugins array, then
add rules you need to the rules list.
Note that the rule is namespaced with `plugin/`.

Like so:

```js
// .stylelintrc
{
	"plugins": [
		"/path/to/stylelint-no-browser-hacks/lib"
	],
	"rules": {
		// ...
		"plugin/no-browser-hacks": [true, {
            browsers: [
                "last 2 versions",
                "ie >=7"
            ]
        }],
		// ...
	}
}
```

## Options

### `true`

Defaults to the browserslist default, which targets modern browsers.

The following patterns are considered warnings:

```css
a { color/*\**/: pink\9; }
```

As this hack targets IE7-8.

## Optional secondary options

### `browsers: "browserslist string"`

A string interpreted by [browserslist] that designates precisely which browsers
you wish to support. Something like `"> 1%, last 2 versions, ie >= 8"`. For
details about the syntax (which is the same as when using Autoprefixer, by the
way), please read [the browserslist documentation][browserslist].

If you set `browsers: [ "last 2 versions", "ie >=7" ]` the hack above is
allowed.

[ci-img]: https://travis-ci.org/Slamdunk/stylelint-no-browser-hacks.svg?branch=master
[ci]: https://travis-ci.org/Slamdunk/stylelint-no-browser-hacks
[npm]: https://www.npmjs.com/package/stylelint-no-browser-hacks
[npm-v-img]: https://img.shields.io/npm/v/stylelint-no-browser-hacks.svg
[npm-d-img]: https://img.shields.io/npm/dt/stylelint-no-browser-hacks.svg
[gemnasium-img]: https://gemnasium.com/badges/github.com/Slamdunk/stylelint-no-browser-hacks.svg
[gemnasium]: https://gemnasium.com/github.com/Slamdunk/stylelint-no-browser-hacks
[stylelint]: https://stylelint.io/
[stylehacks]: https://github.com/ben-eb/stylehacks
[stylehacks-issues]: https://github.com/ben-eb/stylehacks/issues
[original-rule]: https://github.com/stylelint/stylelint/tree/7.9.0/lib/rules/no-browser-hacks
[sitepoint-browser-specific-css-hacks]: https://www.sitepoint.com/browser-specific-css-hacks/
[browserslist]: https://github.com/ai/browserslist
