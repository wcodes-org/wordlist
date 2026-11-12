# Agent instructions (wcodes-org/wordlist)

Canonical 1,024-word dictionary, served at https://wordlist.wcodes.org (Cloudflare Workers Builds from `main`).

Data and docs are CC0 1.0; code is Apache-2.0. After changing words or docs, run `node scripts/build.js` and `node --test`. Do not amend a published version; do not force-push.

## Public-facing copy

Maintainer and developer notes must never appear in public-facing output (website copy, embedded docs, or UI text). That includes implementation details, filenames kept for compatibility, TODOs, “reasons not recorded”, toolchain commands, and instructions to the developer.

Keep those in this repo’s docs, in HTML comments (`<!-- maintainer -->`), or in a “Notes for maintainers” section. The wcodes.org/wordlist page embeds BLACKLIST.md, GREYLIST.md and RULES.md and strips those maintainer blocks. Public bullets should use short reasons without rule-number or filename asides. Before shipping a docs change that is embedded on the site, check the public page for bleed.
