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

test('every v3 word decodes to its v3 index; encoding uses current words', () => {
  v3.forEach((w, i) => assert.equal(dict.getIndex(w), i, w));
  list.words.forEach((w, i) => assert.equal(dict.getWord(i), w));
});

test('every v4 word decodes to its v4 index; jeep is retired in favour of scooter', () => {
  const v4 = read('versions/v4.json');
  const v4Words = Array.isArray(v4) ? v4 : v4.words;
  assert.equal(v4.version, 4);
  assert.equal(v4Words[436], 'jeep');
  v4Words.forEach((w, i) => assert.equal(dict.getIndex(w), i, w));
  assert.equal(dict.getWord(436), 'scooter');
  assert.equal(dict.canonical('jeep'), 'scooter');
  assert.ok(dict.isRetired('jeep'));
});

test('current words are not in the NATO phonetic alphabet', () => {
  const { NATO_WORDS, natoKey } = require(path.join(root, 'scripts/build.js'));
  assert.deepEqual(list.words.filter((w) => NATO_WORDS.has(natoKey(w))), []);
});

test('GREYLIST.md only lists current words', () => {
  const { parseCandidates } = require(path.join(root, 'scripts/build.js'));
  const listed = parseCandidates(fs.readFileSync(path.join(root, 'GREYLIST.md'), 'utf8'));
  assert.ok(listed.length > 0);
  listed.forEach((w) => assert.ok(list.words.includes(w), w));
});

test('BLACKLIST.md covers every retired word and no current words', () => {
  const { parseCandidates, NATO_WORDS, natoKey } = require(path.join(root, 'scripts/build.js'));
  const listed = [...new Set(parseCandidates(fs.readFileSync(path.join(root, 'BLACKLIST.md'), 'utf8')))];
  const retired = Object.keys(aliases.retired);
  retired.forEach((w) => assert.ok(listed.includes(w), 'missing retired ' + w));
  listed.forEach((w) => {
    assert.ok(!list.words.includes(w), 'current word in blacklist: ' + w);
    assert.ok(w in aliases.retired || NATO_WORDS.has(natoKey(w)), 'unexpected blacklist word: ' + w);
  });
});
