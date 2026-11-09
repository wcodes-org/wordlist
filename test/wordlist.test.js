'use strict';
// Run: node --test test/wordlist.test.js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const read = (f) => JSON.parse(fs.readFileSync(path.join(root, f), 'utf8'));
const list = read('wordlist.json');
const aliases = read('aliases.json');
const v3 = read('versions/v3.json');
const dict = require(path.join(root, 'wordlist.js'));

test('wordlist.json and aliases.json validate', () => {
  require(path.join(root, 'scripts/build.js')).validate(list, aliases);
});

test('generated files match wordlist.json', () => {
  assert.equal(dict.version, list.version);
  assert.deepEqual(dict.WORDS, list.words);
  assert.equal(fs.readFileSync(path.join(root, 'wordlist.txt'), 'utf8'), list.words.join('\n') + '\n');
});

test("a retired word decodes to its replacement's index ('death' == 'comet')", () => {
  assert.equal(v3[235], 'death');
  assert.equal(dict.getIndex('death'), 235);
  assert.equal(dict.getIndex('comet'), 235);
  assert.equal(dict.getIndex(' Death '), dict.getIndex('comet'));
  assert.equal(dict.canonical('death'), 'comet');
  assert.ok(dict.isRetired('death'));
  assert.ok(!dict.suggest('dea').includes('death'));
});

test('every v3 word decodes to its v3 index; encoding uses v4 words', () => {
  v3.forEach((w, i) => assert.equal(dict.getIndex(w), i, w));
  list.words.forEach((w, i) => assert.equal(dict.getWord(i), w));
});
