# Lang Dojo

A free, open word and phrase database for travelers and language learners. Download Anki decks, CSV files, or browse phrases online.

## Languages

- Japanese, Mandarin, Thai, Korean, French, Spanish

## Categories

Basics, Numbers, Cafe, Restaurant, Supermarket, Taxi, Train, Bus, Hotel

## Data

All phrase and vocabulary data lives in `data/{content-pack}/{language}/{category}.json`. See [`data/DATA_GUIDE.md`](data/DATA_GUIDE.md) for the JSON schema, ID format, and content quality guidelines.

Content is initially generated with AI and reviewed by humans incrementally. Each language folder contains its own `00_changelog.yaml` for the review status of that language.

## Using the data

Anyone is free to use Lang Dojo data for personal or educational purposes. For commercial use, please credit **Lang Dojo by FocusLab LLC**.

## Development

```bash
npm install
npm run dev
```

Built with Next.js and Tailwind CSS.

## Contact

FocusLab LLC — [support@focuslab.dev](mailto:support@focuslab.dev)
