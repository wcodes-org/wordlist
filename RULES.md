# WCode - wordlist rules

Canonical rules for choosing, replacing and versioning the 1024 WCode words. Shown on https://wcodes.org/wordlist

### Word selection criteria:

1. Nouns
**Prefer:** 'Moon'
**Avoid:** 'Run'

2. Prefer concrete nouns.
**Prefer:** 'Car'
**Avoid:** 'Care'

3. Use the base, singular form of the word
**Prefer:** 'Car'
**Avoid:** 'Cars'

4. Popular
**Prefer:** 'Car'
**Avoid:** 'Tomahawk'

5. Simple pronunciation and spelling
**Prefer:** 'Cat'
**Avoid:** 'Penicillin'

6. Avoid words with spelling variants
**Avoid:** words with competing spellings, such as 'Color' and 'Colour'

7. No compounded words
e.g. 'Volley-ball'

8. No immoral and objectionable words
e.g. 'Bomb' 'Dog' 'Pig'

9. Positive words over negative ones
**Prefer:** 'Rise'
**Avoid:** 'Fall'

10. No synonyms
**Avoid:** using both 'Man' and 'Person'

11. Unique, distinct and no homophones
**Prefer:** a distinct word such as 'Apple'
**Avoid:** using both 'Rose' and 'Rows'

12. No singular and plural of the same word
**Avoid:** using both 'Foot' and 'Feet', or both 'Child' and 'Children'

13. No words that are only used in the plural
**Avoid:** 'Scissors', 'Trousers' and 'Pants'

14. Distinct spelling - at least 2 letters apart from every other word (required for new words; existing close pairs are reviewed over time)
**Avoid:** using 'Car' alongside 'Card' or 'Cart'

15. Distinct sound - no confusable minimal pairs, including common Indian English accent pairs (v/w, s/sh, z/j, th/t, short/long vowels)
**Avoid:** pairs such as 'Vest' and 'West', or 'Sheep' and 'Ship' (required for new words; existing pairs are reviewed over time)

16. One pronunciation only
e.g. 'Bow', 'Lead', 'Wind' and 'Wound' each have two

17. Spelt the way it sounds - avoid silent letters and irregular spellings
**Prefer:** 'Cat'
**Avoid:** 'Receipt' and 'Plough'

18. Familiar to Indian and global speakers
**Prefer:** 'Mango'
**Avoid:** 'Quince'
Frequency (English Zipf >= 3.5) is a guide, not a rule: 'Brinjal' and 'Guava' are familiar in India though rare in global English

19. Not offensive, vulgar or awkward in Indian languages either, including when spoken by an Indian English speaker or typed in Roman script
e.g. check Hindi, Marathi, Tamil, Telugu, Kannada, Malayalam, Bengali, Gujarati, Punjabi and Urdu with native speakers

20. Neutral - no death, disease, weapons, violence, crime, religion, politics or brand names
**Prefer:** 'Comet'
**Avoid:** 'Death' and brand names such as 'Jeep'

21. Length: 3 to 10 letters

22. No words from the NATO phonetic alphabet (spelling a code aloud with it would conflict)
e.g. Alfa/Alpha, Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hotel, India, Juliett/Juliet, Kilo, Lima, Mike, November, Oscar, Papa, Quebec, Romeo, Sierra, Tango, Uniform, Victor, Whiskey/Whisky, Xray/X-ray, Yankee, Zulu

### Dictionary constraints:

- Exactly 1024 (2^10) words; each word is one 10-bit index
- Lowercase ASCII letters only, no duplicates
- The index of a word is its data. Order in `wordlist.json` / `wordlist.js` / `wordlist.txt` is the encoding order, never re-sort it. `Wordlist.tsv` is grouped by category for reading only
- A replaced word takes the slot (index) of the word it replaces, which is why some slots are out of alphabetical order (e.g. 'author', 'basic', 'clip', 'swim')

### Emoji:

- Emoji are a memory aid only, never part of a code; always show the word with its emoji
- Each word gets its own emoji that shows that exact word, not a related one
e.g. 'Mud' must not use 💩, 'War' must not use 🕊️
- One emoji per word: no emoji shared by two words
- No ZWJ sequences or skin-tone variants; single code point (plus VS16) only
- Must render on the oldest supported Android / iOS versions; avoid the newest Unicode release
- Must be named the same way when spoken, so a listener can't confuse it with another word

### Versioning:

- Any word replacement changes what a slot is called, so it needs a new dictionary version. The index (the data) never changes
- Old codes must still decode: every retired word maps to a replacement at the same index. Decoders accept the retired word as that index
- Encoders only output words from the latest list
- A retired word is never reused, for any slot
- Each version is described in [`VERSIONS.md`](VERSIONS.md): date, reason and every changed index

<!-- maintainer
The root wordlist.json is always the latest version: { "version": N, "size": 1024, "words": [...] }. Older versions are kept in versions/ (versions/v3.json is the original plain array). Retired words are listed in aliases.json with index and replacement. Decoders that read wordlist.json must accept both the object and the old plain-array form, and treat a plain array as version 3. Edit wordlist.json, aliases.json and Wordlist.tsv only, then run `node scripts/build.js` (regenerates wordlist.txt and wordlist.js) and `node --test test/wordlist.test.js`.
-->

### Greylist:

- Some current words may be replaced, or have their emoji fixed, in a later version. They stay in the live list until then. See [`GREYLIST.md`](GREYLIST.md)

### Blacklist:

- Words that are not in the current list are described in [`BLACKLIST.md`](BLACKLIST.md). Those that were previously in the main list and were replaced still decode via a replacement at the same index.
- Words that were never in the main list — the NATO phonetic alphabet (rule 22), and words considered and not used — are not aliases and have no replacement.
- A replacement is taken from outside the considered-and-not-used list by default
- A blacklisted word can only be re-admitted after a fresh review against the current rules, and a note in `VERSIONS.md`

<!-- maintainer
The considered-and-not-used inventory is Wordlist-black.tsv (filename kept for existing URLs and tools). Reasons were not recorded for the existing entries; from now on, put the reason in the Remark column. Re-admission also means recording why the word was blacklisted (or that the reason is unknown) and showing it passes every rule and check above.
-->

### Checks for every new version:

- 1024 unique words, lowercase ASCII, 3-10 letters
- Every changed slot keeps its index; no other slot changes
- New words: not in the current list, not a NATO phonetic alphabet word (rule 22), edit distance >= 2 from every word, no homophone, no confusing sound-alike, not previously considered and not used (or re-admitted as above)
- Native-speaker review for sensitivity in Indian languages
- Listening test: say, hear and type 3-word codes over a phone call

<!-- maintainer
build.js checks that every changed slot keeps its index against every file in versions/. New-word checks also use the CMU dict, Double Metaphone, accent pairs, and Wordlist-black.tsv (or a recorded re-admission).
-->

Current version: 4 - see [VERSIONS.md](VERSIONS.md)
