import { testRule } from 'stylelint-test-rule-node';
import noBrowserHacks from '../lib/index.js';

const plugins = [noBrowserHacks];

testRule({
  ruleName: noBrowserHacks.ruleName,
  config: [true],
  plugins: plugins,

  reject: [
    {
      code: 'h1 { _color: red }',
      description: 'ie 6 underscore hack',
      message: noBrowserHacks.rule.messages.rejected('property', '_color'),
      line: 1,
      column: 1,
    },
    {
      code: 'div {} h1 { color: red !ie }',
      description: 'ie 5.5-7 important hack',
      message: noBrowserHacks.rule.messages.rejected('!important', '!ie'),
      line: 1,
      column: 8,
    },
    {
      code: '@media screen\\9 { h1 { color: red } }',
      description: 'ie 7 media screen\\9 hack',
      message: noBrowserHacks.rule.messages.rejected('media query', 'screen\\9'),
      line: 1,
      column: 1,
    },
    {
      code: 'html ~ /**/ body h1 { color: red }',
      description: 'html combinator comment body hack',
      message: noBrowserHacks.rule.messages.rejected('selector', 'html ~ /**/ body h1'),
      line: 1,
      column: 1,
    },
  ],
});
