import type CaptionText from '@/types/CaptionText'
import type CaptionWord from '@/types/CaptionWord'

const xhr = new XMLHttpRequest()
xhr.overrideMimeType("text/xml")
const trimStart = /^[^a-zA-Z]+/

export default function parseXMLCaption(timedtext: string) {
  return new Promise<CaptionText[]>((resolve, reject) => {
    const texts = Array.from(new DOMParser().parseFromString(timedtext, 'text/xml').getElementsByTagName('text'))
    const captionTexts: CaptionText[] = []
    for (const text of texts) {
      const start = text.attributes.getNamedItem('start')
      const dur = text.attributes.getNamedItem('dur')
      let content = text.textContent
      if (start === null || dur === null || content === null) {
        reject(xhr)
        return
      }

      // Youtube字幕文件内容会转码两次，这里使用innerHTML的代理进行自动解码
      text.innerHTML = content
      content = text.textContent!

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
        start: Number(start.value),
        dur: Number(dur.value),
        content,
        words,
        firstSeparator: firstSeparator
      })
    }
    resolve(captionTexts)
  })
}
