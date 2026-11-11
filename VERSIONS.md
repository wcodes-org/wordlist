# Wordlist versions

What changed in each version of the WCode wordlist, why, and how old codes keep working.

- Latest list: [`wordlist.json`](wordlist.json) (also [`wordlist.txt`](wordlist.txt) and [`wordlist.js`](wordlist.js))
- Older lists: [`versions/`](versions/)
- Retired words: [`aliases.json`](aliases.json)
- Rules referenced below (by number): [`RULES.md`](RULES.md)

| Version | Date | Words changed | Summary |
| ---: | --- | ---: | --- |
| [4](#v4---2026-11-09) | 2026-11-09 | 28 | Removed weapons, crime, disease, plural forms, spelling variants, homophones and words with two pronunciations |
| [3](#v3---2019-05-18) | 2019-05-18 | - | First published list |

## How versions stay compatible

A WCode is a list of indexes (0-1023). Each word stands for one index; the index is the data. A new version only changes **what a slot is called**, never what it means:

- **Same slot.** A replacement word takes the index of the word it replaces. In v4, *comet* is index 235, as *death* was in v3.
- **Old codes still decode.** Every retired word is listed in [`aliases.json`](aliases.json) with its index. Decoders accept it as that index, so `death` and `comet` decode to the same thing. With an updated decoder, a code written in 2019 decodes exactly as it did then.
- **New codes use new words.** Encoders only output words from the latest `wordlist.json`. Suggestions and autocomplete show only current words.
- **Retired words are never reused.** A retired word can't come back for another slot, because old codes would then decode wrongly.
- **Old clients keep working.** Until v3, the root `wordlist.json` was a plain array. From v4 it is an object (`{ "version", "size", "words" }`). A decoder that still expects an array ignores the new file and keeps its bundled v3 list. It then reads v3 codes, but not codes that use a new v4 word.

`wordlist.js` gives apps this behaviour directly: `getIndex('death') === getIndex('comet') === 235`, `canonical('death') === 'comet'`, `isRetired('death') === true`.

## v4 - 2026-11-09

**Why:** A review of the v3 list against the rules found words that are weapons, crime, disease or violence (rule 20), plural or plural-only forms (12, 13), spelling variants (6), homophones (11), and words with two pronunciations (16). 28 were replaced. The other 996 slots are unchanged.

The draft was then reviewed by a second reviewer (OpenAI Codex), whose suggestions were checked the same way. That review led to better words for four slots (*prison*, *rifle*, *trouser*, *wound*: the first drafts *capsule*, *diagram*, *textile* and *emblem* were abstract, technical or hard to show) and to retiring *lead* and *wind*, which, like *wound*, have two pronunciations (16). The drafts were never published, so they are not aliases: only v3 words are.

**Reading the table:** *Index* is the slot (the data). *Rule* points to [`RULES.md`](RULES.md).

| Index | Old word (v3) | New word (v4) | Rule | Why the old word went | Why the new word |
| ---: | --- | --- | --- | --- | --- |
| 120 | cancer | marina | 20 | Disease. | Harbour for boats; concrete and neutral. |
| 123 | cannon | aquarium | 20, 11 | Weapon; sounds the same as *canon*. | Concrete place; no near neighbours in the list. |
| 160 | children | puppet | 12 | Plural of *child*, which is also in the list. | Concrete object; simple spelling. |
| 161 | chili | citrus | 6 | Spelled *chili*, *chilli* and *chile*. | One spelling; a familiar fruit group. |
| 190 | color | banner | 6 | Spelled *color* and *colour*. | One spelling; concrete object. |
| 235 | death | comet | 20 | Death is morbid. | A neutral sky object. |
| 250 | disk | pixel | 6 | Spelled *disk* and *disc*. | One spelling; common in everyday tech. |
| 312 | feet | wagon | 12 | Plural of *foot*, which is also in the list. | Concrete vehicle; singular base form. |
| 468 | lead | crystal | 16 | Said *leed* (to guide) or *led* (the metal). | Concrete, familiar object; one pronunciation. |
| 606 | pair | coconut | 11 | Sounds the same as *pear* (kept) and *pare*. | Concrete, familiar fruit. |
| 610 | pant | wardrobe | 13 | Used almost only in the plural (*pants*). | Concrete furniture; singular. |
| 661 | plough | harvest | 6, 17 | Spelled *plough* and *plow*; the *ough* spelling does not match the sound. | Regular spelling; farming meaning kept. |
| 685 | prison | burger | 20 | Crime and punishment. | Familiar food everywhere, easy to say and to show (🍔). |
| 720 | rifle | puzzle | 20 | Weapon. | Concrete toy, easy to show (🧩); spelled as it sounds. |
| 737 | route | junction | 11, 16 | Said as *root* (a homophone of *root*) or *rout*. | One pronunciation; concrete place. |
| 754 | scent | cinnamon | 11 | Sounds the same as *cent* and *sent*. | Concrete, familiar spice in India and elsewhere. |
| 757 | scissor | stripe | 13 | Used almost only in the plural (*scissors*). | Concrete pattern; singular. |
| 828 | spear | chamber | 20 | Weapon. | Neutral, concrete place. |
| 872 | sword | portal | 20, 17 | Weapon; silent *w*. | Neutral; spelled as it sounds. |
| 877 | tale | sketch | 11 | Sounds the same as *tail*. | Concrete object; no homophone. |
| 893 | thief | laser | 20 | Crime. | Neutral, concrete object. |
| 934 | trouser | microphone | 13 | Used almost only in the plural (*trousers*). | Concrete object, easy to show (🎤); no near neighbours. |
| 963 | venom | harness | 20, 9 | Poison; negative. | Neutral, concrete object. |
| 981 | war | monument | 20 | Violence. | Neutral, concrete structure. |
| 986 | weapon | shuttle | 20 | Weapon. | Neutral vehicle (space shuttle, shuttle bus). |
| 996 | whip | container | 20 | Violence. | Neutral, concrete object. |
| 1000 | wind | sunrise | 16 | Said *wind* (air) or *wind* (to turn), with different vowels. | Concrete scene, easy to show (🌅); one pronunciation. |
| 1014 | wound | sticker | 20, 16 | Injury; also said *wound* (past tense of *wind*) with a different vowel. | Concrete, everyday object; one pronunciation. |

**How the new words were checked.** Every new word:

- is not already in the list, and not in [`Wordlist-black.tsv`](Wordlist-black.tsv);
- is a common, concrete, singular noun of 3-10 letters (English Zipf frequency >= 3.5, in the CMU pronouncing dictionary);
- is at least 2 letters different from every other word (edit distance >= 2);
- has no homophone, Double Metaphone match or common Indian English accent minimal pair (v/w, s/sh, z/j, th/t, short/long vowels) with any other word.

**Effect on the whole list:**

| Check | v3 | v4 |
| --- | ---: | ---: |
| Same-pronunciation pairs (CMU) | 4 | 0 |
| Words with more than one CMU pronunciation | 100 | 96 |
| Singular/plural pairs | 2 | 0 |
| Pairs one letter apart | 667 | 630 |
| Double Metaphone pairs | 1,269 | 1,197 |
| Accent minimal pairs | 18 | 17 |

**Also in v4:**

- `wordlist.json` became an object with a `version` field (see above). The v3 files moved unchanged to [`versions/v3.json`](versions/v3.json), [`v3.txt`](versions/v3.txt) and [`v3.js`](versions/v3.js).
- [`Wordlist.tsv`](Wordlist.tsv) (the list grouped by category, for reading) now lists the v4 words. Each new word sits in a matching category, and its *Remark* says which word it replaced.
- The emoji shown next to each word on https://wcodes.org/wordlist were updated for the new words.

**Still open:** a native-speaker review of the new words in Indian languages (rule 19), and a listening test over a phone call.

## v3 - 2019-05-18

The first published list: 1024 nouns, a plain JSON array. Kept unchanged at [`versions/v3.json`](versions/v3.json). Earlier drafts were not published.

## Adding a version

1. Pick each replacement under [`RULES.md`](RULES.md) and run its checks. Use a word that has never been in any version.
2. In `wordlist.json`, put the new word at the **same index** as the old one and increase `version` by 1. Never reorder the list.
3. Copy the previous root `wordlist.json` words into `versions/vN.json` (N = the previous version).
4. Add each retired word to `aliases.json` as `"old": { "index": i, "replacement": "new", "retiredIn": N+1 }`, and set its `version` to match.
5. Update `Wordlist.tsv`: remove the old word and add the new one in a matching category, with a *Remark*.
6. Run `node scripts/build.js` (validates everything and regenerates `wordlist.txt` and `wordlist.js`) and `node --test test/wordlist.test.js`.
7. Add a section to this file: date, why, and a full table of changed indexes.
8. Update the apps that bundle a copy of the list (see each app's notes) **before** publishing the new list, so they can decode new words as soon as they appear.
