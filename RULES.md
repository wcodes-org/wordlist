# WCode - wordlist rules

Canonical rules for choosing, replacing and versioning the 1024 WCode words. Shown on https://wcodes.org/wordlist

### Word selection criteria:

1. Nouns
e.g. 'Moon' against 'Run'

2. Preferabely: tangible, non-absract i.e. concrete – nouns.
e.g. 'Car' against 'Care'

3. Base, singular form of the word
e.g. 'Car' against 'Cars'

4. Popular
e.g. 'Car' against 'Tomahawk'

5. Simple pronounciation and spelling
e.g. 'Cat' against 'Penicillin'

6. Avoid words with spelling variantes
e.g. 'Color' and 'Colour'

7. No compounded words
e.g. 'Volley-ball'

8. No immoral and objectionable words
e.g. 'Bomb' 'Dog' 'Pig'

9. Postive words over negative ones
e.g. 'Rise' instead of 'Fall'

10. No synonyms
e.g. 'Man' and 'Person'

11. Unique, distinct and no homophones
e.g. 'Apple' against 'Rose' and 'Rows'

12. No singular and plural of the same word
e.g. 'Foot' and 'Feet', or 'Child' and 'Children'

13. No words that are only used in the plural
e.g. 'Scissor', 'Trouser', 'Pant'

14. Distinct spelling - at least 2 letters apart from every other word (required for new words; existing close pairs are reviewed over time)
e.g. 'Car' against 'Card' and 'Cart'

15. Distinct sound - no confusable minimal pairs, including common Indian English accent pairs (v/w, s/sh, z/j, th/t, short/long vowels)
e.g. 'Vest' against 'West', 'Sheep' against 'Ship' (required for new words; existing pairs are reviewed over time)

16. One pronunciation only
e.g. 'Bow', 'Lead', 'Wind' and 'Wound' each have two

17. Spelled the way it sounds - avoid silent letters and irregular spellings
e.g. 'Cat' against 'Receipt' and 'Plough'

18. Familiar to Indian and global speakers
e.g. 'Mango' against 'Quince'. Frequency (English Zipf >= 3.5) is a guide, not a rule: 'Brinjal' and 'Guava' are familiar in India though rare in global English

19. Not offensive, vulgar or awkward in Indian languages either, including when spoken by an Indian English speaker or typed in Roman script
e.g. check Hindi, Marathi, Tamil, Telugu, Kannada, Malayalam, Bengali, Gujarati, Punjabi and Urdu with native speakers

20. Neutral - no death, disease, weapons, violence, crime, religion, politics or brand names
e.g. 'Comet' instead of 'Death', 'Jeep' is a brand

21. Length: 3 to 10 letters

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

- Any word replacement changes what a slot is called, so it needs a new dictionary version (`v4/`, `v5/`, ...). Never edit the live root files in place
- Old codes must still decode: a new version lists the retired word as an alias of its slot (`aliases.json`, in Wolo's `[primary, ...aliases]` format)
- Encoders only output the primary (newest) word
- Decoders are updated to accept aliases before the root files are switched to a new version
- A retired word is never reused for a different slot

### Discarded words:

- [`Wordlist-black.tsv`](Wordlist-black.tsv) lists 5045 words considered and discarded. Reasons were not recorded
- A replacement is taken from outside this list by default
- To re-admit a discarded word: record why it was discarded (or that the reason is unknown), show it passes every rule above and the checks below, and note it in that version's `CHANGES.md`
- From now on, record the reason in the 'Remark' column when discarding a word

### Checks for every new version:

- 1024 unique words, lowercase ASCII, 3-10 letters
- Every changed slot keeps its index; no other slot changes
- New words: not in the current list, edit distance >= 2 from every word, no homophone (CMU dict), no Double Metaphone or accent minimal-pair match, not discarded (or re-admitted as above)
- Native-speaker review for sensitivity in Indian languages
- Listening test: say, hear and type 3-word codes over a phone call

Current draft: [`v4/`](v4/CHANGES.md)
