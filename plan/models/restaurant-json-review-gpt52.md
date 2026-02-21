## Restaurant JSON: suggested list changes

Based on `data/japanese/restaurant.json`, here are the **additions** / **deletions (or replacements)** I’d make to the *phrases* + *words* lists, with reasons.

## Phrases — add

- **Add “Excuse me (to get staff attention)”**
  - **Why**: In real restaurants this is the highest-frequency “unlock phrase” (you need it before ordering, asking for water, getting the bill).
  - **Suggestion**: `すみません` / pronunciation `sumimasen`

- **Add “Do you have an English menu?”**
  - **Why**: Common tourist need; currently you can ask to *see* a menu, but not request a language option.
  - **Suggestion**: `英語のメニューはありますか？` / pronunciation `eigo no menyuu wa arimasu ka?`

- **Add “I have a reservation (under NAME)”**
  - **Why**: Covers a core restaurant flow (arrival). Current set covers seating count, but not reservation check-in.
  - **Suggestion**: `予約しています。` / pronunciation `yoyaku shiteimasu`

- **Add “How long is the wait?”**
  - **Why**: You have “Please wait” (staff → customer) but not the customer’s question.
  - **Suggestion**: `どれくらい待ちますか？` / pronunciation `dorekurai machimasu ka?`

- **Add “What do you recommend?”**
  - **Why**: Natural follow-up after receiving the menu; improves conversation usefulness.
  - **Suggestion**: `おすすめは何ですか？` / pronunciation `osusume wa nan desu ka?`

- **Add “Could we split the bill?”**
  - **Why**: Japan-specific friction point; currently the payment section covers *method* (cash/card) but not *splitting*.
  - **Suggestion**: `別々に会計できますか？` / pronunciation `betsu-betsu ni kaikei dekimasu ka?`

- **Add “Can I get this to go?”**
  - **Why**: Another common flow missing from the dataset; good practical coverage.
  - **Suggestion**: `持ち帰りできますか？` / pronunciation `mochikaeri dekimasu ka?`

- **Add “Does this contain X?” (allergy/ingredients)**
  - **Why**: You have “Is this spicy?” and a generic allergy statement, but not the crucial *ingredient check*.
  - **Suggestion**: `（卵／乳／小麦）は入っていますか？` / pronunciation `... wa haitteimasu ka?`

## Phrases — delete or replace

- **Replace (or delete) `jp-rest-table-for-two`**
  - **Current**: English “Table for two, please” vs Japanese `二人です` (“We are two.”).
  - **Why**: The EN ⇄ JP meaning mismatch will train the wrong mapping.
  - **Replacement options**:
    - Keep JP as-is, change EN to **“It’s two people.”**
    - Or keep EN, change JP to something closer, e.g. **`二人です。お願いします。`**

- **Replace (or delete) `jp-rest-allergic-to`**
  - **Current**: `...アレルギーがあります` (placeholder) and it’s missing the natural target marker **`〜に`**.
  - **Why**: As written it’s not a “drop-in” phrase learners can safely use.
  - **Replacement options**:
    - Make it a pattern: **`〜にアレルギーがあります`**
    - Or make concrete entries: **`ピーナッツにアレルギーがあります`**, **`卵にアレルギーがあります`**, etc.

## Words — add

- **Add reservation + seating basics**
  - **Why**: Enables the new reservation/waiting phrases.
  - **Suggestions**: `予約`(yoyaku), `名前`(namae), `空席`(kuuseki), `禁煙`(kinen), `喫煙`(kitsu-en)

- **Add billing vocabulary**
  - **Why**: You have `お会計` only inside a phrase; learners may want the standalone noun set.
  - **Suggestions**: `会計`(kaikei), `別々`(betsu-betsu), `レシート`(reshiito), `領収書`(ryoushuusho)

- **Add takeaway vocabulary**
  - **Why**: Supports the takeaway phrase.
  - **Suggestions**: `持ち帰り`(mochikaeri), `テイクアウト`(teikuauto)

- **Add common restaurant items currently missing**
  - **Why**: Increases menu comprehension beyond the current list.
  - **Suggestions**: `お茶`(ocha), `コーヒー`(koohii), `唐揚げ`(karaage), `焼き鳥`(yakitori)

- **Add allergy/ingredients vocabulary**
  - **Why**: Makes allergy/ingredient phrases usable with specific nouns.
  - **Suggestions**: `ピーナッツ`(piinattsu), `小麦`(komugi), `乳`(nyuu), `甲殻類`(koukakurui)

## Words — delete or replace

- **No strong deletions**
  - **Why**: The current `words` list is short and broadly useful; I’d focus on expanding coverage rather than removing items.

