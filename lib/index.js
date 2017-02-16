"use strict";

const stylelint = require("stylelint");
const stylehacks = require("stylehacks");
const Result = require("postcss/lib/result");
const lodash = require("lodash");

const ruleName = "plugin/no-browser-hacks";
const messages = stylelint.utils.ruleMessages(ruleName, {rejected: (type, hack) => `Unexpected ${type} hack "${hack}"`});

const rule = stylelint.createPlugin(ruleName, (primaryOption, secondaryOptionObject) => (postcssRoot, postcssResult) => {
    const validOptions = stylelint.utils.validateOptions(
        postcssResult,
        ruleName,
        {actual: primaryOption},
        {
            actual: secondaryOptionObject,
            possible: {browsers: [lodash.isString]},
            optional: true
        }
    );

    if (! validOptions) {
        return;
    }

    const stylehacksOptions = {lint: true};

    if (secondaryOptionObject && secondaryOptionObject.browsers) {
        stylehacksOptions.browsers = secondaryOptionObject.browsers;
    }

    const stylehacksResult = new Result();

    stylehacks(stylehacksOptions)(postcssRoot, stylehacksResult);
    stylehacksResult.warnings().forEach((stylehacksWarning) => {
        const message = messages.rejected(stylehacksWarning.identifier, stylehacksWarning.hack);

        stylelint.utils.report({
            ruleName: ruleName,
            result: postcssResult,
            message: message,
            node: stylehacksWarning.node,
            line: stylehacksWarning.line,
            column: stylehacksWarning.column
        });
    });
});

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
