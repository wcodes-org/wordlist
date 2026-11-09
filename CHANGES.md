# Wordlist changes

## v4 - 2026-11-09

26 words retired. Each replacement takes the retired word's index, so every index keeps its meaning and v3 codes still decode (see [`aliases.json`](aliases.json)). The v3 list is kept at [`versions/v3.json`](versions/v3.json).

| Index | Retired (v3) | Replacement (v4) | Reason |
| ---: | --- | --- | --- |
| 120 | cancer | marina | disease |
| 123 | cannon | aquarium | weapon; homophone of canon |
| 160 | children | puppet | plural of child |
| 161 | chili | citrus | spelling variants chilli / chile |
| 190 | color | banner | spelling variant colour |
| 235 | death | comet | morbid |
| 250 | disk | pixel | spelling variant disc |
| 312 | feet | wagon | plural of foot |
| 606 | pair | coconut | homophone of pear (pear kept as the concrete noun) |
| 610 | pant | wardrobe | plural-only garment |
| 661 | plough | harvest | spelling variant plow |
| 685 | prison | capsule | crime |
| 720 | rifle | diagram | weapon |
| 737 | route | junction | homophone of root in one common pronunciation |
| 754 | scent | cinnamon | homophone of cent |
| 757 | scissor | stripe | plural-only tool |
| 828 | spear | chamber | weapon |
| 872 | sword | portal | weapon; silent w |
| 877 | tale | sketch | homophone of tail |
| 893 | thief | laser | crime |
| 934 | trouser | textile | plural-only garment |
| 963 | venom | harness | poison |
| 981 | war | monument | violence |
| 986 | weapon | shuttle | weapon |
| 996 | whip | container | violence |
| 1014 | wound | emblem | injury; two pronunciations |

Replacement checks: each new word is not in v3, not in `Wordlist-black.tsv`, English Zipf frequency >= 3.5, a base-form concrete noun, in the CMU dict, edit distance >= 2 from every v4 word, and has no CMU homophone, Double Metaphone or accent minimal-pair match with any v4 word. Native-speaker review for Indian languages is still pending.

`Wordlist.tsv` (the categorized table) still lists the v3 words; it is for reading only and has not been re-categorized.

## v3 - 2019-05-18

Original 1024-word list. Plain JSON array at [`versions/v3.json`](versions/v3.json) (the format the root `wordlist.json` used until v4).
