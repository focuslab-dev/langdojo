# Restaurant JSON Review — claude-4

## Overview

The file contains 14 phrases and 30 vocabulary words covering a Japanese restaurant experience. The phrase flow is logical (arrival → ordering → dietary → payment → exit), and the word list has solid food coverage. However, there are structural issues and notable gaps that weaken the practical value for learners.

---

## Phrases

### Suggested Deletions

#### `jp-rest-please-wait` — "Please wait to be seated"
- **Reason:** This is a staff-to-guest phrase that a learner would only ever *hear*, never *say*. Mixing passive-comprehension phrases into an active phrasebook is pedagogically confusing. If the app doesn't distinguish "phrases to say" from "phrases to understand," a learner might rehearse this and then say it to staff, which is odd. It should either be removed or clearly tagged as a "you'll hear this" entry.

#### `jp-rest-cash-or-card` — "Cash or card?"
- **Reason:** Same issue as above — this is a staff-initiated question. The learner's perspective is already covered by `jp-rest-pay-by-card` ("Can I pay by card?"). Having the staff's question here is redundant and again blurs who is supposed to say what.

---

### Suggested Additions

#### "Excuse me!" — すみません (sumimasen)
- **Reason:** This is arguably the single most-used phrase in any Japanese restaurant. Learners need it to flag down a server. Its absence is the most significant gap in the entire list. Every other ordering phrase becomes unreachable without a way to get staff attention first.

#### "What do you recommend?" — おすすめは何ですか？ (osusume wa nan desuka?)
- **Reason:** An extremely common tourist phrase. When the menu is unfamiliar or in Japanese-only, asking for a recommendation is a natural fallback. It's also grammatically useful (demonstrates は + question word structure).

#### "Do you have an English menu?" — 英語のメニューはありますか？ (eigo no menyuu wa arimasu ka?)
- **Reason:** Critical for tourists at non-tourist-facing restaurants. Many Japanese establishments have a Japanese-only menu. This is a practical high-priority phrase that directly serves the learner's most likely situation.

#### "I cannot eat..." — ～が食べられません (~ga taberaremasen)
- **Reason:** The existing `jp-rest-allergic-to` covers allergies, but "I can't eat X" is a softer, more general way to express dietary restrictions (preference, religion, intolerance without clinical allergy). These two phrases complement each other. The potential form (食べられません) is also grammatically important and worth exposing early.

#### "To go, please" — 持ち帰りでお願いします (mochikaeri de onegaishimasu)
- **Reason:** Takeout is increasingly common, and many Japanese restaurants now offer it. A learner visiting a ramen or bento shop will likely need this. It also introduces 持ち帰り as a useful compound word.

---

## Words

### Suggested Deletions

None. The word list is well-chosen and not bloated. No word feels gratuitous.

---

### Suggested Additions

#### `tea` — お茶 / ocha
- **Reason:** The most glaring omission in the entire word list. Green tea is served free at most Japanese restaurants and is the default drink offered. A learner will encounter this word within the first 30 seconds of sitting down. Including beer and sake but not tea is a strange prioritization.

#### `set meal` — 定食 / teishoku
- **Reason:** 定食 is ubiquitous in Japanese lunch culture — it's the word for a fixed-price meal with rice, soup, and a main. It appears on almost every casual restaurant menu. Without it, learners will struggle to understand the most common menu category.

#### `sour` — 酸っぱい / suppai
- **Reason:** The flavors list has spicy, sweet, and salty but skips sour. These four are the core taste descriptors a learner needs. Sour is relevant for citrus dishes, vinegar-based items, and fermented foods common in Japanese cuisine (e.g., pickles, ponzu).

#### `knife` — ナイフ / naifu
- **Reason:** The utensil set has chopsticks, fork, and spoon — but not knife. While Japanese food rarely requires cutting, Western-style restaurants and steak houses in Japan will have knives. The set feels incomplete without it.

#### `gyoza` — 餃子 / gyouza
- **Reason:** One of the most ordered items at izakayas and ramen shops. The food words include ramen, udon, soba, sushi, tempura, sashimi — gyoza belongs in this group. It's on nearly every casual restaurant menu and is culturally iconic.

#### `reservation` — 予約 / yoyaku
- **Reason:** Learners may need to confirm, make, or ask about reservations. The word appears naturally in many restaurant interactions ("Do you have a reservation?" / "I have a reservation under..."). Currently the word list has no entry for this concept despite it being a key part of the restaurant experience.

#### `non-smoking seat` — 禁煙席 / kin'enseki
- **Reason:** Many Japanese restaurants still separate smoking and non-smoking areas, and staff often ask which the guest prefers. Learners need to recognize and request 禁煙席. A smoking/non-smoking distinction word (even just 禁煙 = no smoking) is practically useful.

---

## Summary Table

| Type | Action | Entry | Reason |
|------|--------|-------|--------|
| Phrase | Delete | `jp-rest-please-wait` | Staff-only phrase; learners never say it |
| Phrase | Delete | `jp-rest-cash-or-card` | Staff-only phrase; redundant with pay-by-card |
| Phrase | Add | すみません | Most essential phrase; needed to get staff attention |
| Phrase | Add | おすすめは何ですか？ | Common tourist fallback when menu is unfamiliar |
| Phrase | Add | 英語のメニューはありますか？ | Critical for non-Japanese menus |
| Phrase | Add | ～が食べられません | Dietary restriction without allergy framing |
| Phrase | Add | 持ち帰りでお願いします | Takeout is common; introduces key vocabulary |
| Word | Add | お茶 (tea) | Most common restaurant drink; biggest omission |
| Word | Add | 定食 (set meal) | Ubiquitous menu category in Japan |
| Word | Add | 酸っぱい (sour) | Completes the four core flavor descriptors |
| Word | Add | ナイフ (knife) | Completes the utensil set |
| Word | Add | 餃子 (gyoza) | Iconic, widely-ordered Japanese dish |
| Word | Add | 予約 (reservation) | Key concept in restaurant interactions |
| Word | Add | 禁煙席 (non-smoking seat) | Practical; staff often ask about seating preference |
