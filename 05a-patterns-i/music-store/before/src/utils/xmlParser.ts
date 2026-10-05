// ADAPTER SOURCE PARSER — converts a flat-element XML document into Record<string, string>[]

/**
 * Parses a simple XML document where every record is represented as a
 * repeated wrapper element whose direct children are plain text fields.
 *
 * Example input (excerpt):
 *   <plays>
 *     <play id="yt-001">
 *       <track>Anti-Hero</track>
 *       <artist>Taylor Swift</artist>
 *       <streams>314</streams>
 *       <genre>Pop</genre>
 *     </play>
 *   </plays>
 *
 * Returns an array of objects where:
 *   - each attribute on the wrapper element is included as-is  (e.g. { id: "yt-001" })
 *   - each child element's text content is keyed by the tag name (e.g. { track: "Anti-Hero" })
 *   - XML entities (&amp; &lt; &gt; &quot; &apos;) are decoded in all values
 *
 * Limitations (intentional — keeps the implementation readable):
 *   - Nested child elements are not supported; only one level of children is read.
 *   - CDATA sections are treated as plain text.
 *   - The XML declaration and comments are silently skipped.
 */
export function parseXML(content: string, recordTag: string): Record<string, string>[] {
  // Strip the XML declaration and comments so they don't confuse the tag scanner.
  const stripped = content
    .replace(/<\?xml[^?]*\?>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "");

  // (?=[\s>]) ensures we match <play ...> and <play> but NOT <plays>.
  // Without it, "<play" would match as a prefix inside "<plays>".
  const recordPattern = new RegExp(
    `<${recordTag}(?=[\\s>])([^>]*)>([\\s\\S]*?)<\\/${recordTag}>`,
    "g"
  );

  const records: Record<string, string>[] = [];

  for (const match of stripped.matchAll(recordPattern)) {
    const [, attrsRaw, body] = match;
    const record: Record<string, string> = {};

    // ── Attributes on the wrapper element ───────────────────────────────────
    // e.g.  id="yt-001"  or  id='yt-001'
    for (const m of attrsRaw.matchAll(/(\w[\w-]*)=["']([^"']*)["']/g)) {
      record[m[1]] = decodeEntities(m[2]);
    }

    // ── Child element text content ───────────────────────────────────────────
    // e.g.  <track>Anti-Hero</track>
    for (const m of body.matchAll(/<(\w[\w-]*)>([^<]*)<\/\1>/g)) {
      record[m[1]] = decodeEntities(m[2].trim());
    }

    records.push(record);
  }

  return records;
}

/** Decodes the five predefined XML character entities. */
function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g,  "&")
    .replace(/&lt;/g,   "<")
    .replace(/&gt;/g,   ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}
