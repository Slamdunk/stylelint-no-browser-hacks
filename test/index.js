"use strict";

const testRule = require("stylelint-test-rule-ava");
const noBrowserHacks = require("../lib");

testRule(noBrowserHacks.rule, {
    ruleName: noBrowserHacks.ruleName,
    config: [true],

    reject: [
        {
            code: "h1 { _color: red }",
            description: "ie 6 underscore hack",
            message: noBrowserHacks.messages.rejected("property", "_color"),
            line: 1,
            column: 6
        },
        {
            code: "div {} h1 { color: red !ie }",
            description: "ie 5.5-7 important hack",
            message: noBrowserHacks.messages.rejected("!important", "!ie"),
            line: 1,
            column: 13
        },
        {
            code: "@media screen\\9 { h1 { color: red } }",
            description: "ie 7 media screen\\9 hack",
            message: noBrowserHacks.messages.rejected("media query", "screen\\9"),
            line: 1,
            column: 1
        },
        {
            code: "html ~ /**/ body h1 { color: red }",
            description: "html combinator comment body hack",
            message: noBrowserHacks.messages.rejected("selector", "html ~ /**/ body h1"),
            line: 1,
            column: 1
        }
    ]
});

testRule(noBrowserHacks.rule, {
    ruleName: noBrowserHacks.ruleName,
    config: [
        true,
        {browsers: "last 2 versions, ie >= 5"}
    ],

    accept: [
        {
            code: "h1 { _color: red }",
            description: "ie 6 underscore hack"
        },
        {
            code: "div {} h1 { color: red !ie }",
            description: "ie 5.5-7 important hack"
        },
        {
            code: "@media screen\\9 { h1 { color: red } }",
            description: "ie 7 media screen\\9 hack"
        },
        {
            code: "html ~ /**/ body h1 { color: red }",
            description: "html combinator comment body hack"
        }
    ]
});
