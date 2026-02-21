# Data Files — Phrase & Word JSON

## File Structure

```
data/
  {language}/
    {category}.json
```

---

## JSON Schema

```json
{
  "categoryId": "restaurant",
  "languageId": "japanese",
  "phrases": [
    {
      "id": "jp-rest-how-many-people",
      "translation": "How many people?",
      "text": "何名様ですか？",
      "pronunciation": "nanmei-sama desuka?",
      "words": [
        {
          "text": "何名様",
          "pronunciation": "nanmei-sama",
          "translation": "how many people (honorific)"
        },
        {
          "text": "ですか？",
          "pronunciation": "desuka?",
          "translation": "is it? (question)"
        }
      ]
    }
  ],
  "words": [
    {
      "id": "jp-rest-w-rice",
      "translation": "rice",
      "text": "ご飯",
      "pronunciation": "gohan"
    }
  ]
}
```

### ID Format

- **Phrases**: `{prefix}-{category}-{descriptor}` — e.g. `jp-rest-how-many-people`
- **Words**: `{prefix}-{category}-w-{descriptor}` — e.g. `jp-rest-w-rice`

All IDs must be unique within a file. Descriptors should be short, lowercase, hyphen-separated English.

### Phrases vs Words

- **Phrases** are full sentences or expressions. Each phrase includes an inline `words` array that breaks the sentence into its constituent parts with per-word pronunciation and translation.
- **Words** are standalone vocabulary items relevant to the category. They do NOT have an inline `words` breakdown — just `id`, `translation`, `text`, and `pronunciation`.

---

## Content Quality Guidelines

### Phrase Selection

**Follow the real-world flow.** Order phrases chronologically as someone would experience them. For restaurant: arriving → seating → waiting → getting attention → browsing menu → ordering → eating → paying → leaving.

**Mix both sides of the conversation.** Include both what the learner says ("I'll have this one") and what they'll hear from staff ("Are you ready to order?"). A traveler needs to both speak and comprehend.

**Prefer concrete over abstract.** Instead of a template like "...アレルギーがあります" (I'm allergic to...), use a complete example like "卵アレルギーがあります" (I have an egg allergy). Concrete phrases are more useful for flashcard export and pattern recognition.

**Include culturally significant phrases.** For Japanese restaurants, いただきます and ごちそうさまでした are essential. For Thai, ending particles (ครับ/ค่ะ) matter. Don't reduce the list to pure utility — cultural fluency is part of the product.

**Include high-frequency essentials.** If a phrase is used in nearly every real encounter (like すみません to call a waiter in Japan), it belongs here regardless of how "basic" it seems.

### Word Selection

**Cover the core concepts of the domain.** For restaurant: key dishes, proteins, flavors, utensils, drinks, and practical ordering concepts (large serving, set meal, soy sauce). Think about what a learner actually needs to decode a menu or make a request.

**Don't duplicate words already well-covered in phrases.** The `words` list supplements the phrases. If a word only appears embedded in a single phrase and isn't useful on its own, it may not need a standalone entry.

### Pronunciation

**Stay consistent within one romanization system.** For Japanese, use doubled vowels for long sounds (`shoushou`, `koohii`, `oomori`) — NOT macrons (`shōshō`) or circumflexes (`shôshô`). Pick one and stick to it across every file for that language.

**Match actual spoken forms.** If a particle is pronounced differently from its written form (は → wa, を → wo), use the spoken pronunciation.

### Inline Word Breakdowns

Every phrase should break down into meaningful learnable chunks in its `words` array.

- If a phrase is a single indivisible word (like すみません or いただきます), the `words` array should be empty.
- Keep the translations concise. Avoid full sentence translations for individual word entries — just the meaning or grammatical role.

### Size Targets

The ideal size is **20 phrases** and **30 words**. It's not a concrete rule — it can be less or more depending on the language and category.

---

## Consistency Across Languages

All 6 languages should cover the same categories with roughly parallel content. The phrases don't need to be identical translations — they should reflect how people actually interact in that language's culture. A Korean cafe has different conventions than a French one, and the phrases should reflect that.

However, the structural schema, ID format, and quality bar should be uniform.
