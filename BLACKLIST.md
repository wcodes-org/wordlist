# Blacklist

Words that are not used in the current list, in two groups: words that were once in the main list, and words that never were.

### Rejected

Words that were previously in the main list and have been replaced. Each one still decodes: it maps to a replacement at the same index.

#### v6 (2026-11-12)

- `pretzel` — difficult to spell and pronounce. Replaced by `taco`.

#### v5 (2026-11-12)

- `jeep` — brand name. Replaced by `taco`.

#### v4 (2026-11-09)

- `cancer` — disease. Replaced by `marina`.
- `cannon` — weapon; sound-alike of “canon”. Replaced by `aquarium`.
- `children` — plural of child, which is also in the list. Replaced by `puppet`.
- `chili` — spelling variants. Replaced by `citrus`.
- `color` — spelling variants. Replaced by `banner`.
- `death` — morbid. Replaced by `comet`.
- `disk` — spelling variants. Replaced by `pixel`.
- `feet` — plural of foot, which is also in the list. Replaced by `wagon`.
- `lead` — two pronunciations. Replaced by `crystal`.
- `pair` — sound-alike of pear (kept) and “pare”. Replaced by `coconut`.
- `pant` — used almost only in the plural “pants”. Replaced by `wardrobe`.
- `plough` — spelling variants; spelling does not match the sound. Replaced by `harvest`.
- `prison` — crime and punishment. Replaced by `burger`.
- `rifle` — weapon. Replaced by `puzzle`.
- `route` — two pronunciations; sound-alike of root. Replaced by `junction`.
- `scent` — sound-alike of “cent” and “sent”. Replaced by `cinnamon`.
- `scissor` — used almost only in the plural “scissors”. Replaced by `stripe`.
- `spear` — weapon. Replaced by `chamber`.
- `sword` — weapon; silent “w”. Replaced by `portal`.
- `tale` — sound-alike of “tail”. Replaced by `sketch`.
- `thief` — crime. Replaced by `laser`.
- `trouser` — used almost only in the plural “trousers”. Replaced by `microphone`.
- `venom` — poison; negative. Replaced by `harness`.
- `war` — violence. Replaced by `monument`.
- `weapon` — weapon. Replaced by `shuttle`.
- `whip` — violence. Replaced by `container`.
- `wind` — two pronunciations. Replaced by `sunrise`.
- `wound` — injury; also the past tense of wind, with a different vowel. Replaced by `sticker`.

### Blacklist

#### NATO alphabet

- `alfa`
- `alpha`
- `bravo`
- `charlie`
- `delta`
- `echo`
- `foxtrot`
- `golf`
- `hotel`
- `india`
- `juliett`
- `juliet`
- `kilo`
- `lima`
- `mike`
- `november`
- `oscar`
- `papa`
- `quebec`
- `romeo`
- `sierra`
- `tango`
- `uniform`
- `victor`
- `whiskey`
- `whisky`
- `xray`
- `yankee`
- `zulu`

#### Considered and not used

### Notes for maintainers

Words under **Blacklist** were never in the main list. They are not aliases: they do not decode, and they have no replacement.

NATO phonetic alphabet words are excluded by rule 22: spelling a code aloud with the NATO alphabet would conflict with wordlist words. Variant spellings (`alfa`/`alpha`, `juliett`/`juliet`, `whiskey`/`whisky`) and `xray` (also spelled “x-ray”) are listed separately. The public heading is “NATO alphabet”.

The rest of the considered-and-not-used inventory is in [`Wordlist-black.tsv`](Wordlist-black.tsv) (the filename is unchanged so existing URLs and tools keep working). Reasons were not recorded for the existing entries. When a word is added from now on, the reason goes in that file's Remark column.

A blacklisted word can only be re-admitted after a fresh review against the current rules, and a note in [`VERSIONS.md`](VERSIONS.md). See [RULES.md](RULES.md).

Full reasons and rule citations for retired words are in [`VERSIONS.md`](VERSIONS.md). Public bullets use a short reason (no rule numbers); the page shows the replacement on hover.

The public site embed strips this section, and any `<!-- maintainer -->` comments, so this note does not appear on wcodes.org/wordlist.
