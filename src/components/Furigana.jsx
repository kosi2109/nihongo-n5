/**
 * Furigana component - renders Japanese text with reading on top (ruby text)
 * Like a real Japanese textbook
 * Usage: <Furigana text="学生" reading="がくせい" />
 */

export default function Furigana({ text, reading, size = 'normal' }) {
  // If text and reading are the same (pure kana), just show text
  if (!reading || reading === text) {
    return <span className={`jp-text jp-text--${size}`}>{text}</span>;
  }

  // Check if text has any kanji (non-kana) characters
  const hasKanji = /[\u4e00-\u9faf\u3400-\u4dbf]/.test(text);

  if (!hasKanji) {
    return <span className={`jp-text jp-text--${size}`}>{text}</span>;
  }

  // Render ruby text: kanji on bottom, reading on top
  return (
    <ruby className={`furigana furigana--${size}`}>
      {text}
      <rt className="furigana-rt">{reading}</rt>
    </ruby>
  );
}

/**
 * Renders a Japanese sentence where we show furigana above all
 * kanji words. Splits the sentence and applies ruby to any word
 * that has a known furigana mapping.
 *
 * @param {string} text - The Japanese sentence
 * @param {Object} furiganaMap - Map of { kanji: reading } e.g. { "学生": "がくせい" }
 * @param {string} size - 'small' | 'normal'
 */
export function FuriganaText({ text, furiganaMap = {}, size = 'normal' }) {
  if (!text) return null;

  const hasKanji = /[\u4e00-\u9faf\u3400-\u4dbf]/.test(text);
  if (!hasKanji || Object.keys(furiganaMap).length === 0) {
    return <span className={`jp-text jp-text--${size}`}>{text}</span>;
  }

  // Sort keys longest-first so multi-kanji words match before single kanji
  const keys = Object.keys(furiganaMap).sort((a, b) => b.length - a.length);

  // Build regex that matches any of the known kanji words
  const escaped = keys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escaped.join('|')})`, 'g');

  const parts = text.split(regex);

  return (
    <span className={`jp-text jp-text--${size}`}>
      {parts.map((part, i) => {
        const reading = furiganaMap[part];
        if (reading) {
          return (
            <ruby key={i} className={`furigana furigana--${size}`}>
              {part}
              <rt className="furigana-rt">{reading}</rt>
            </ruby>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}
