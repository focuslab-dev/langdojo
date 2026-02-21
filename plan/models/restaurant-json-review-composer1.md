# Restaurant JSON — Deletion & Addition Suggestions

Review of `data/japanese/restaurant.json` for a Japanese restaurant phrasebook.

---

## Possible Deletions

### 1. **jp-rest-cash-or-card** (Cash or card?)
- **Reason:** This is typically said by staff to the customer, not by the customer. For a tourist phrasebook focused on what the learner would say, staff-side phrases are less useful. The learner is more likely to need "Can I pay by card?" (already present as jp-rest-pay-by-card) than to ask "Cash or card?" which reverses the usual interaction.

### 2. **jp-rest-w-without** (抜き)
- **Reason:** Redundant with usage. The concept of "without" is already demonstrated in **jp-rest-no-meat** ("肉抜きでお願いします"). As a standalone word, 抜き is rarely used alone; it appears in compound patterns like 肉抜き, ネギ抜き. Keeping it as a word may confuse learners who expect to use it as a standalone term.

### 3. **jp-rest-w-salty** (しょっぱい)
- **Reason:** Lower frequency in restaurant contexts compared to 辛い (spicy) and 甘い (sweet). Salty is less often something you need to ask about or describe when ordering. Could be deprioritized to keep the word list focused on higher-utility terms.

---

## Possible Additions

### 1. **"One more, please" / もう一つください**
- **Reason:** Very common when ordering another drink, dish, or item. Essential for extending an order without repeating the full phrase.

### 2. **"Do you have vegetarian options?" / ベジタリアン向けの料理はありますか？**
- **Reason:** Increasingly important for travelers. The current list has "No meat, please" but not a proactive question about vegetarian availability.

### 3. **"Is there a non-smoking section?" / 禁煙席はありますか？**
- **Reason:** Still relevant in Japan where smoking sections exist in many restaurants. Helps travelers who prefer non-smoking seating.

### 4. **"I'd like to reserve a table" / 予約したいのですが**
- **Reason:** Common for nicer or popular restaurants. Complements "How many people?" and "Table for two" by covering the reservation step.

### 5. **"What do you recommend?" / おすすめは何ですか？**
- **Reason:** Very useful for getting staff suggestions, especially when the menu is hard to read or choices are overwhelming.

### 6. **"Can I have a doggy bag?" / 持ち帰れますか？**
- **Reason:** Portions can be large; travelers often want to take leftovers. Not all Japanese restaurants offer this, so asking is practical.

### 7. **Word: 辛くない (not spicy)**
- **Reason:** Complements "Is this spicy?" — learners need to request mild versions. Pattern like 辛くないのでお願いします (not spicy, please) is common.

### 8. **Word: 大盛り (large portion)**
- **Reason:** Common at ramen and rice shops. Useful for requesting larger servings.

### 9. **Word: 小盛り (small portion)**
- **Reason:** Pairs with 大盛り; useful for lighter eaters or when sharing.

### 10. **Word: お茶 (tea)**
- **Reason:** Tea is often served free or by default in Japanese restaurants. More relevant than some existing drink words for typical dining.

---

## Summary

| Action   | Item                          | Priority |
|----------|-------------------------------|----------|
| Delete   | jp-rest-cash-or-card          | Medium   |
| Delete   | jp-rest-w-without             | Low      |
| Delete   | jp-rest-w-salty               | Low      |
| Add      | One more, please              | High     |
| Add      | Vegetarian options?           | High     |
| Add      | Non-smoking section?         | Medium   |
| Add      | I'd like to reserve           | Medium   |
| Add      | What do you recommend?        | High     |
| Add      | Doggy bag?                    | Medium   |
| Add      | Word: 辛くない (not spicy)    | High     |
| Add      | Word: 大盛り (large portion)  | Medium   |
| Add      | Word: 小盛り (small portion)  | Low      |
| Add      | Word: お茶 (tea)              | Medium   |
