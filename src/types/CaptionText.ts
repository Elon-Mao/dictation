import type CaptionWord from './CaptionWord'

export default interface CaptionText {
    start: number
    dur: number
    content: string
    words: CaptionWord[]
    firstSeparator: string
}