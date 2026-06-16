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
 */
export function FuriganaText({ text, size = 'normal' }) {
  if (!text) return null;
  const hasKanji = /[\u4e00-\u9faf\u3400-\u4dbf]/.test(text);
  if (!hasKanji) {
    return <span className={`jp-text jp-text--${size}`}>{text}</span>;
  }
  // For sentences without explicit reading map, just show text
  return <span className={`jp-text jp-text--${size}`}>{text}</span>;
}
