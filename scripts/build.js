#!/usr/bin/env node
'use strict';
/**
 * Regenerates wordlist.txt and wordlist.js from wordlist.json + aliases.json,
 * after validating them. Run: node scripts/build.js
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = (f) => JSON.parse(fs.readFileSync(path.join(root, f), 'utf8'));

// NATO phonetic alphabet and spelling variants. A wordlist word in this set
// would clash if a code is spelled aloud with the NATO alphabet.
const NATO_WORDS = new Set([
  'alfa', 'alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot', 'golf',
  'hotel', 'india', 'juliett', 'juliet', 'kilo', 'lima', 'mike', 'november',
  'oscar', 'papa', 'quebec', 'romeo', 'sierra', 'tango', 'uniform', 'victor',
  'whiskey', 'whisky', 'xray', 'x-ray', 'yankee', 'zulu',
].map((w) => w.replace(/-/g, '')));

function natoKey(word) {
  return String(word).toLowerCase().replace(/-/g, '');
}

function parseCandidates(markdown) {
  const words = [];
  for (const line of markdown.split(/\r?\n/)) {
    const m = line.match(/^-\s+((?:`[a-z]+`(?:,\s*)?)+)/);
    if (!m) continue;
    for (const wm of m[1].matchAll(/`([a-z]+)`/g))
      words.push(wm[1]);
  }
  return words;
}

function validate(list, aliases) {
  const errors = [];
  const words = list.words;
  if (!Number.isInteger(list.version)) errors.push('version must be an integer');
  if (!Array.isArray(words) || words.length !== 1024) errors.push('words must hold exactly 1024 entries');
  if (list.size !== words.length) errors.push('size must equal words.length');
  if (new Set(words).size !== words.length) errors.push('duplicate words');
  words.forEach((w, i) => { if (!/^[a-z]{3,10}$/.test(w)) errors.push(`bad word at ${i}: ${w}`); });
  const natoHits = words
    .map((w, i) => NATO_WORDS.has(natoKey(w)) ? `${w} (${i})` : null)
    .filter(Boolean);
  if (natoHits.length) errors.push('NATO phonetic alphabet word(s): ' + natoHits.join(', '));
  const current = new Set(words);
  const greylistPath = path.join(root, 'GREYLIST.md');
  if (fs.existsSync(greylistPath)) {
    const listed = parseCandidates(fs.readFileSync(greylistPath, 'utf8'));
    const missing = [...new Set(listed)].filter((w) => !current.has(w));
    if (missing.length) errors.push('GREYLIST.md lists words not in wordlist.json: ' + missing.join(', '));
  }
  const blacklistPath = path.join(root, 'BLACKLIST.md');
  if (fs.existsSync(blacklistPath)) {
    const listed = [...new Set(parseCandidates(fs.readFileSync(blacklistPath, 'utf8')))];
    const retired = Object.keys(aliases.retired);
    for (const w of retired) {
      if (!listed.includes(w)) errors.push('BLACKLIST.md is missing retired word: ' + w);
    }
    const natoListed = listed.filter((w) => NATO_WORDS.has(natoKey(w)));
    const retiredSet = new Set(retired);
    const leftover = listed.filter((w) => !retiredSet.has(w) && !NATO_WORDS.has(natoKey(w)));
    if (leftover.length) errors.push('BLACKLIST.md lists words that are neither retired nor NATO: ' + leftover.join(', '));
    const stillCurrent = listed.filter((w) => current.has(w));
    if (stillCurrent.length) errors.push('BLACKLIST.md lists current wordlist.json words: ' + stillCurrent.join(', '));
  }
  if (aliases.version !== list.version) errors.push('aliases.json version differs from wordlist.json');
  for (const [word, entry] of Object.entries(aliases.retired)) {
    if (words.includes(word)) errors.push(`retired word still active: ${word}`);
    if (words[entry.index] !== entry.replacement) errors.push(`retired ${word}: index ${entry.index} holds ${words[entry.index]}, not ${entry.replacement}`);
  }
  // Every older version must map index-for-index onto the current list (via aliases).
  const versionsDir = path.join(root, 'versions');
  for (const f of fs.readdirSync(versionsDir).filter((f) => /^v\d+\.json$/.test(f))) {
    const old = JSON.parse(fs.readFileSync(path.join(versionsDir, f), 'utf8'));
    const oldWords = Array.isArray(old) ? old : old.words;
    oldWords.forEach((w, i) => {
      if (words[i] !== w && !(aliases.retired[w] && aliases.retired[w].index === i))
        errors.push(`${f}: '${w}' at ${i} is neither current nor a retired alias of ${i}`);
    });
  }
  // Wordlist.tsv (categorized, for reading) must hold exactly the current words.
  const tsvPath = path.join(root, 'Wordlist.tsv');
  if (fs.existsSync(tsvPath)) {
    const tsvWords = fs.readFileSync(tsvPath, 'utf8').split(/\r?\n/).slice(1)
      .flatMap((line) => line.split('\t').slice(3, 6)).filter(Boolean);
    const current = new Set(words);
    const listed = new Set(tsvWords);
    if (tsvWords.length !== listed.size) errors.push('Wordlist.tsv lists a word twice');
    for (const w of current) if (!listed.has(w)) errors.push(`Wordlist.tsv is missing ${w}`);
    for (const w of listed) if (!current.has(w)) errors.push(`Wordlist.tsv lists ${w}, which is not in wordlist.json`);
  }
  if (errors.length) throw new Error('Wordlist validation failed:\n- ' + errors.join('\n- '));
}

function sdk(list, aliases) {
  const retired = Object.entries(aliases.retired)
    .sort((a, b) => a[1].index - b[1].index)
    .map(([w, e]) => `    "${w}": ${e.index}`).join(',\n');
  return `/**
 * WCode Wordlist & Lookup Dictionary - version ${list.version}
 * 1024 distinct nouns (Base-1024 / 10 bits per word)
 * Source of truth: https://wordlist.wcodes.org
 * Generated by scripts/build.js from wordlist.json and aliases.json - do not edit by hand.
 */
(function(global) {
  'use strict';

  const VERSION = ${list.version};

  const WORDS = [
${list.words.map((w) => `  "${w}"`).join(',\n')}
];

  // Retired words (older versions) -> index. They decode, but are never encoded.
  const RETIRED = {
${retired}
  };

  const WORD_INDEX = new Map();
  for (let i = 0; i < WORDS.length; i++) {
    WORD_INDEX.set(WORDS[i], i);
  }
  const RETIRED_INDEX = new Map(Object.entries(RETIRED));

  function clean(word) {
    return typeof word === 'string' ? word.trim().toLowerCase() : '';
  }

  const WCodeDictionary = {
    version: VERSION,
    WORDS,
    WORD_INDEX,
    RETIRED,
    size: WORDS.length,

    getWord(index) {
      if (index >= 0 && index < WORDS.length) {
        return WORDS[index];
      }
      return null;
    },

    // Accepts current and retired words; a retired word gives its replacement's index.
    getIndex(word) {
      const w = clean(word);
      if (!w) return -1;
      if (WORD_INDEX.has(w)) return WORD_INDEX.get(w);
      if (RETIRED_INDEX.has(w)) return RETIRED_INDEX.get(w);
      return -1;
    },

    isValid(word) {
      return this.getIndex(word) !== -1;
    },

    isRetired(word) {
      return RETIRED_INDEX.has(clean(word));
    },

    // Current word for any current or retired word, or null.
    canonical(word) {
      const idx = this.getIndex(word);
      return idx === -1 ? null : WORDS[idx];
    },

    // Suggests current words only.
    suggest(prefix, max = 8) {
      if (!prefix) return [];
      const p = clean(prefix);
      if (!p) return [];
      const results = [];
      for (let i = 0; i < WORDS.length; i++) {
        if (WORDS[i].startsWith(p)) {
          results.push(WORDS[i]);
          if (results.length >= max) break;
        }
      }
      return results;
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = WCodeDictionary;
  } else {
    global.WCodeDictionary = WCodeDictionary;
  }
})(typeof window !== 'undefined' ? window : globalThis);
`;
}

function main() {
  const list = read('wordlist.json');
  const aliases = read('aliases.json');
  validate(list, aliases);
  fs.writeFileSync(path.join(root, 'wordlist.txt'), list.words.join('\n') + '\n');
  fs.writeFileSync(path.join(root, 'wordlist.js'), sdk(list, aliases));
  console.log(`[build] wordlist v${list.version}: ${list.words.length} words, ${Object.keys(aliases.retired).length} retired aliases`);
}

if (require.main === module) main();
module.exports = { validate, NATO_WORDS, natoKey, parseCandidates };
