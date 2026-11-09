# Dictionary v4 (draft)

Status: **draft, not published.** The live v3 files in the repository root (`wordlist.json`, `wordlist.js`, `wordlist.txt`) are unchanged and are still what `https://wordlist.wcodes.org` serves.

## What changed

26 slots carry a new word. Every index keeps its position and bit value, so a v4 code and a v3 code with the same indexes mean the same data. Only the spoken word in these 26 slots differs.

| Index | v3 word | v4 word | Reason for retiring the v3 word |
| ---: | --- | --- | --- |
| 120 | cancer | marina | disease |
| 123 | cannon | aquarium | weapon; also canon homophone |
| 160 | children | puppet | plural of child |
| 161 | chili | citrus | spelling variants chilli / chile |
| 190 | color | banner | spelling variant colour; vowel pair with collar |
| 235 | death | comet | morbid |
| 250 | disk | pixel | spelling variant disc |
| 312 | feet | wagon | plural of foot |
| 606 | pair | coconut | homophone of pear; abstract noun (pear kept as concrete) |
| 610 | pant | wardrobe | non-standard singular of pants; regional (pants/trousers) |
| 661 | plough | harvest | spelling variant plow; irregular spelling |
| 685 | prison | capsule | crime / incarceration |
| 720 | rifle | diagram | weapon |
| 737 | route | junction | homophone of root in one common pronunciation |
| 754 | scent | cinnamon | homophone of cent (CMU); also a silent letter |
| 757 | scissor | stripe | non-standard singular of scissors |
| 828 | spear | chamber | weapon |
| 872 | sword | portal | weapon; silent w |
| 877 | tale | sketch | homophone of tail |
| 893 | thief | laser | crime |
| 934 | trouser | textile | non-standard singular of trousers |
| 963 | venom | harness | poison |
| 981 | war | monument | violence |
| 986 | weapon | shuttle | weapon |
| 996 | whip | container | violence |
| 1014 | wound | emblem | injury; two pronunciations (wound/wound) |

## Files

- `wordlist.json`, `wordlist.txt`, `wordlist.js`: same formats as the root files, v4 words.
- `wordlist.js` adds `version: 4` to `WCodeDictionary`.
- `aliases.json`: 1,024 slots in Wolo's nested format `[primary, ...aliases]`. The 26 changed slots are `[v4word, v3word]` so decoders keep accepting v3 codes. Encoders use the first entry.

## Before publishing

1. Decoders (WCode app `wordlist.js`, Wolo `WordList.js` / `sync-wordlist.js` / `OfflineStore.js`) must accept the v3 alias for each changed slot. Wolo's sync only keeps aliases it already has, so it must read `aliases.json` (or equivalent) before the root `wordlist.json` is switched. Otherwise existing v3 codes using a retired word stop decoding.
2. Encoders must never emit a retired word.
3. Then copy the v4 files over the root files in one commit and publish.

## Replacement checks

Each new word: not in v3, not in `Wordlist-black.tsv`, English Zipf frequency ≥ 3.5, concrete noun in base form (WordNet first sense), in CMU dict, edit distance ≥ 2 from every v4 word, and no CMU homophone, Double Metaphone or accent minimal-pair collision with any v4 word. Native-speaker review for Indian languages is still pending.
