import type CaptionText from '@/types/CaptionText'
import type CaptionWord from '@/types/CaptionWord'

const xhr = new XMLHttpRequest()
xhr.overrideMimeType("text/xml")
const trimStart = /^[^a-zA-Z]+/

export default function parseXMLCaption(timedtext: string) {
  const events = JSON.parse(timedtext).events;
  const captionTexts: CaptionText[] = []
  for (const event of events) {
    if (!event.segs || event.aAppend) {
      continue
    }
    let content = event.segs.map((seg: { utf8: string }) => seg.utf8).join('')
    const firstSeparator = content.match(trimStart)?.[0] || ''
    content = content.substring(firstSeparator.length)
    const words: CaptionWord[] = []
    let lastIndex = 0
    for (const match of content.matchAll(/[^a-zA-Z]+/g)) {
      const matchIndex = match.index!
      words.push({
        value: content.substring(lastIndex, matchIndex),
        separator: match[0]
      })
      lastIndex = matchIndex + match[0].length
    }
    if (lastIndex < content.length) {
      words.push({
        value: content.substring(lastIndex),
        separator: ''
      })
    }

    captionTexts.push({
      start: event.tStartMs / 1000,
      dur: event.dDurationMs / 1000,
      content,
      words,
      firstSeparator: firstSeparator
    })
  }
  return captionTexts
}


