import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const { vocabulary } = await import('./src/data/vocabulary.js');
  const { grammar } = await import('./src/data/grammar.js');

  const outDir = path.join(__dirname, 'src', 'data', 'lessons');
  await fs.mkdir(outDir, { recursive: true });

  const metadata = {};
  const furiganaMap = {};

  vocabulary.forEach(v => {
    if (v.japanese && v.reading && v.japanese !== v.reading) {
      if (/[\u4e00-\u9faf\u3400-\u4dbf]/.test(v.japanese)) {
        furiganaMap[v.japanese] = v.reading;
      }
    }
  });

  await fs.writeFile(path.join(__dirname, 'src', 'data', 'furiganaMap.js'), `export const FURIGANA_MAP = ${JSON.stringify(furiganaMap, null, 2)};\n`);

  for (let lesson = 1; lesson <= 25; lesson++) {
    const lessonVocab = vocabulary.filter(v => v.lesson === lesson);
    const lessonGrammar = grammar.filter(g => g.lesson === lesson);

    const lessonDir = path.join(outDir, String(lesson));
    await fs.mkdir(lessonDir, { recursive: true });

    await fs.writeFile(path.join(lessonDir, 'vocab.js'), `export const vocab = ${JSON.stringify(lessonVocab, null, 2)};\n`);
    await fs.writeFile(path.join(lessonDir, 'grammar.js'), `export const grammar = ${JSON.stringify(lessonGrammar, null, 2)};\n`);

    metadata[lesson] = {
      vocab: lessonVocab.map(v => v.id),
      grammar: lessonGrammar.map(g => g.id),
      vocabCount: lessonVocab.length,
      grammarCount: lessonGrammar.length,
    };
  }

  await fs.writeFile(path.join(__dirname, 'src', 'data', 'metadata.js'), `export const metadata = ${JSON.stringify(metadata, null, 2)};\n`);
  console.log('Successfully generated lesson chunks and metadata.');
}

run().catch(console.error);
