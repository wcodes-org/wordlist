# Blacklist

Words that are not used in the current list, in two groups: words that were once in the main list, and words that never were.

### Rejected

Words that were previously in the main list and have been replaced. Each one still decodes: it maps to a replacement at the same index.

#### v4 (2026-11-09)

- `cancer` — disease (rule 20). Replaced by `marina`.
- `cannon` — weapon; sounds the same as “canon” (rules 20, 11). Replaced by `aquarium`.
- `children` — plural of `child`, which is also in the list (rule 12). Replaced by `puppet`.
- `chili` — spelling variants chili / chilli / chile (rule 6). Replaced by `citrus`.
- `color` — spelling variants color / colour (rule 6). Replaced by `banner`.
- `death` — morbid (rule 20). Replaced by `comet`.
- `disk` — spelling variants disk / disc (rule 6). Replaced by `pixel`.
- `feet` — plural of `foot`, which is also in the list (rule 12). Replaced by `wagon`.
- `lead` — two pronunciations, “leed” or “led” (rule 16). Replaced by `crystal`.
- `pair` — sounds the same as `pear` (kept) and “pare” (rule 11). Replaced by `coconut`.
- `pant` — used almost only in the plural “pants” (rule 13). Replaced by `wardrobe`.
- `plough` — spelling variants plough / plow; spelling does not match the sound (rules 6, 17). Replaced by `harvest`.
- `prison` — crime and punishment (rule 20). Replaced by `burger`.
- `rifle` — weapon (rule 20). Replaced by `puzzle`.
- `route` — said as “root” (a homophone of `root`) or “rout” (rules 11, 16). Replaced by `junction`.
- `scent` — sounds the same as “cent” and “sent” (rule 11). Replaced by `cinnamon`.
- `scissor` — used almost only in the plural “scissors” (rule 13). Replaced by `stripe`.
- `spear` — weapon (rule 20). Replaced by `chamber`.
- `sword` — weapon; silent “w” (rules 20, 17). Replaced by `portal`.
- `tale` — sounds the same as “tail” (rule 11). Replaced by `sketch`.
- `thief` — crime (rule 20). Replaced by `laser`.
- `trouser` — used almost only in the plural “trousers” (rule 13). Replaced by `microphone`.
- `venom` — poison; negative (rules 20, 9). Replaced by `harness`.
- `war` — violence (rule 20). Replaced by `monument`.
- `weapon` — weapon (rule 20). Replaced by `shuttle`.
- `whip` — violence (rule 20). Replaced by `container`.
- `wind` — two pronunciations, air or “to turn” (rule 16). Replaced by `sunrise`.
- `wound` — injury; also the past tense of `wind`, with a different vowel (rules 20, 16). Replaced by `sticker`.

### Blacklist

Words that were never in the main list. They are not aliases: they do not decode, and they have no replacement.

#### NATO phonetic alphabet (rule 22)

Spelling a code aloud with the NATO alphabet would conflict with wordlist words. These are not used, and they have no replacement.

- `alfa`, `alpha`
- `bravo`
- `charlie`
- `delta`
- `echo`
- `foxtrot`
- `golf`
- `hotel`
- `india`
- `juliett`, `juliet`
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
- `whiskey`, `whisky`
- `xray` — also spelled “x-ray”
- `yankee`
- `zulu`

#### Considered and not used

The rest of this list is in [`Wordlist-black.tsv`](Wordlist-black.tsv) (the filename is unchanged so existing URLs and tools keep working). Reasons were not recorded for the existing entries. When a word is added from now on, the reason goes in that file's Remark column.

A blacklisted word can only be re-admitted after a fresh review against the current rules, and a note in [`VERSIONS.md`](VERSIONS.md). See [RULES.md](RULES.md).
