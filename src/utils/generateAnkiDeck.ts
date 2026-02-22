import { Phrase } from "@/types";

const MODEL_ID = 1707000000000;
const DECK_ID = 1707000000001;

function getTimestamp(): number {
  return Math.floor(Date.now() / 1000);
}

function guidFromFields(english: string, translation: string): string {
  let hash = 0;
  const str = english + translation;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36).padEnd(10, "0").slice(0, 10);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function generateAnkiDeck(
  items: Phrase[],
  deckName: string,
): Promise<Blob> {
  const initSqlJs = (await import("sql.js")).default;
  const JSZip = (await import("jszip")).default;

  const SQL = await initSqlJs({
    locateFile: () => "/sql-wasm.wasm",
  });

  const db = new SQL.Database();
  const ts = getTimestamp();

  // Create Anki schema
  db.run(`
    CREATE TABLE col (
      id integer primary key,
      crt integer not null,
      mod integer not null,
      scm integer not null,
      ver integer not null,
      dty integer not null,
      usn integer not null,
      ls integer not null,
      conf text not null,
      models text not null,
      decks text not null,
      dconf text not null,
      tags text not null
    )
  `);

  db.run(`
    CREATE TABLE notes (
      id integer primary key,
      guid text not null,
      mid integer not null,
      mod integer not null,
      usn integer not null,
      tags text not null,
      flds text not null,
      sfld text not null,
      csum integer not null,
      flags integer not null,
      data text not null
    )
  `);

  db.run(`
    CREATE TABLE cards (
      id integer primary key,
      nid integer not null,
      did integer not null,
      ord integer not null,
      mod integer not null,
      usn integer not null,
      type integer not null,
      queue integer not null,
      due integer not null,
      ivl integer not null,
      factor integer not null,
      reps integer not null,
      lapses integer not null,
      left integer not null,
      odue integer not null,
      odid integer not null,
      flags integer not null,
      data text not null
    )
  `);

  db.run("CREATE TABLE revlog (id integer primary key, cid integer not null, usn integer not null, ease integer not null, ivl integer not null, lastIvl integer not null, factor integer not null, time integer not null, type integer not null)");
  db.run("CREATE TABLE graves (usn integer not null, oid integer not null, type integer not null)");

  // Model: 3 fields (Vocabulary, Translation, Pronunciation)
  const model = {
    [MODEL_ID]: {
      id: MODEL_ID,
      name: "LangKit 3-Field",
      type: 0,
      mod: ts,
      usn: -1,
      sortf: 0,
      did: DECK_ID,
      tmpls: [
        {
          name: "Card 1",
          ord: 0,
          qfmt: "{{Vocabulary}}",
          afmt: '{{FrontSide}}<hr id="answer">{{Translation}}<br><small style="color:#888">{{Pronunciation}}</small>',
          bqfmt: "",
          bafmt: "",
          did: null,
          bfont: "",
          bsize: 0,
        },
      ],
      flds: [
        { name: "Vocabulary", ord: 0, sticky: false, rtl: false, font: "Arial", size: 20, media: [] },
        { name: "Translation", ord: 1, sticky: false, rtl: false, font: "Arial", size: 20, media: [] },
        { name: "Pronunciation", ord: 2, sticky: false, rtl: false, font: "Arial", size: 20, media: [] },
      ],
      css: ".card { font-family: arial; font-size: 20px; text-align: center; color: black; background-color: white; }",
      latexPre: "",
      latexPost: "",
      latexsvg: false,
      req: [[0, "any", [0]]],
      tags: [],
      vers: [],
    },
  };

  const deck = {
    [DECK_ID]: {
      id: DECK_ID,
      name: deckName,
      mod: ts,
      usn: -1,
      lrnToday: [0, 0],
      revToday: [0, 0],
      newToday: [0, 0],
      timeToday: [0, 0],
      collapsed: false,
      browserCollapsed: false,
      desc: "",
      dyn: 0,
      conf: 1,
      extendNew: 0,
      extendRev: 0,
    },
  };

  const dconf = {
    1: {
      id: 1,
      name: "Default",
      mod: 0,
      usn: 0,
      maxTaken: 60,
      autoplay: true,
      timer: 0,
      replayq: true,
      new: { bury: true, delays: [1, 10], initialFactor: 2500, ints: [1, 4, 0], order: 1, perDay: 20 },
      rev: { bury: true, ease4: 1.3, ivlFct: 1, maxIvl: 36500, perDay: 200, hardFactor: 1.2 },
      lapse: { delays: [10], leechAction: 1, leechFails: 8, minInt: 1, mult: 0 },
    },
  };

  const conf = {
    activeDecks: [1],
    curDeck: 1,
    newSpread: 0,
    collapseTime: 1200,
    timeLim: 0,
    estTimes: true,
    dueCounts: true,
    curModel: MODEL_ID,
    nextPos: 1,
    sortType: "noteFld",
    sortBackwards: false,
    addToCur: true,
  };

  const colStmt = db.prepare("INSERT INTO col VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)");
  colStmt.run([1, ts, ts, ts * 1000, 11, 0, 0, 0, JSON.stringify(conf), JSON.stringify(model), JSON.stringify(deck), JSON.stringify(dconf), "{}"]);
  colStmt.free();

  // Insert notes and cards
  const noteStmt = db.prepare("INSERT INTO notes VALUES(?,?,?,?,?,?,?,?,?,?,?)");
  const cardStmt = db.prepare("INSERT INTO cards VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const noteId = ts * 1000 + i;
    const cardId = noteId + items.length;
    const guid = guidFromFields(item.translation, item.text);
    const flds = `${escapeHtml(item.text)}\x1f${escapeHtml(item.translation)}\x1f${escapeHtml(item.pronunciation ?? "")}`;
    const sfld = escapeHtml(item.text);

    // Simple checksum
    let csum = 0;
    for (let j = 0; j < sfld.length; j++) {
      csum = (csum << 5) - csum + sfld.charCodeAt(j);
      csum |= 0;
    }
    csum = Math.abs(csum);

    noteStmt.run([noteId, guid, MODEL_ID, ts, -1, "", flds, sfld, csum, 0, ""]);
    cardStmt.run([cardId, noteId, DECK_ID, 0, ts, -1, 0, 0, i, 0, 0, 0, 0, 0, 0, 0, 0, ""]);
  }

  noteStmt.free();
  cardStmt.free();

  const data = db.export();
  db.close();

  const zip = new JSZip();
  zip.file("collection.anki2", data);
  zip.file("media", "{}");

  return zip.generateAsync({ type: "blob" });
}
