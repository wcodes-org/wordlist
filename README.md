# WCode - wordlist

List of 1024 simple words for encoding small digital data for humans in-between

Published to the public domain (CC0 1.0). See [LICENSE](LICENSE).

App: https://wcodes.org

Canonical files: https://wordlist.wcodes.org

See also: https://wcodes.org/wordlist

### Word selection criteria:

See [RULES.md](RULES.md) - the canonical rules, also shown on https://wcodes.org/wordlist

### Ranks

Every current word has a suitability rank from 1 (best) to 1024. The ranking favors familiar, concrete words with easy spelling and distinct names. Every Greylist word ranks below every other word.

The `ranks` object in `wordlist.json` maps words to ranks. Edit that object and run `node scripts/build.js` to refresh the `Rank` column in `Wordlist.tsv`. The `words` array still gives the encoding order.

### Greylist:

See [GREYLIST.md](GREYLIST.md) - current words that may be replaced, or whose emoji need work, in a later version.

### Blacklist:

See [BLACKLIST.md](BLACKLIST.md) - words previously in the main list and replaced (still decode via a replacement), and words that were never in the list: the NATO phonetic alphabet (rule 22) and words considered and not used ([`Wordlist-black.tsv`](Wordlist-black.tsv)).

### Versions:

See [VERSIONS.md](VERSIONS.md) - what changed in each version, why, and how old codes keep decoding. Current version: 5

### License

Wordlist data and documentation (including `wordlist.json`, `wordlist.txt`, `wordlist.js`, `Wordlist.tsv`, `aliases.json`, `RULES.md`, `GREYLIST.md`, `BLACKLIST.md`, `VERSIONS.md`, and this README) are dedicated to the public domain under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). See [LICENSE](LICENSE).

Code in `scripts/` and `test/` is licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). See [LICENSE-CODE](LICENSE-CODE).
