import stylelint from 'stylelint';
import stylehacks from 'stylehacks';
import postcss from 'postcss';

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint;

const ruleName = 'plugin/no-browser-hacks';
const messages = ruleMessages(ruleName, { rejected: (type, hack) => `Unexpected ${type} hack "${hack}"` });

/** @type {import('stylelint').Rule} */
const rule = function (primaryOption) {
  return function (postcssRoot, postcssResult) {
    const validOptions = validateOptions(postcssResult, ruleName, { actual: primaryOption });

    if (!validOptions) {
      return;
    }

    const stylehacksOptions = { lint: true };

    postcssRoot.walkRules((node) => {
      const res = postcss([stylehacks(stylehacksOptions)]).process(node);

      res.warnings().forEach((stylehacksWarning) => {
        report({
          message: messages.rejected(stylehacksWarning.node._stylehacks.identifier, stylehacksWarning.node._stylehacks.hack),
          node: node,
          result: postcssResult,
          ruleName: ruleName,
        });
      });
    });
    postcssRoot.walkAtRules((node) => {
      const res = postcss([stylehacks(stylehacksOptions)]).process(node);

      res.warnings().forEach((stylehacksWarning) => {
        report({
          message: messages.rejected(stylehacksWarning.node._stylehacks.identifier, stylehacksWarning.node._stylehacks.hack),
          node: node,
          result: postcssResult,
          ruleName: ruleName,
        });
      });
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;

export default createPlugin(ruleName, rule);
