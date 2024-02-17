declare interface WebkitSpeechRecognition {
  lang: string | undefined
  continuous: boolean | undefined
  start: () => void
  stop: () => void
  onend: () => void
  onresult: (event: { results: SpeechRecognitionResult[] }) => void
}

declare const window: {
  webkitSpeechRecognition: new () => WebkitSpeechRecognition
}

export class SpeechRecognizer {
  recognition: WebkitSpeechRecognition
  results: SpeechRecognitionResult[] = []

  constructor(lang: string) {
    this.recognition = new window.webkitSpeechRecognition()
    this.recognition.lang = lang
    this.recognition.continuous = true
    this.recognition.onresult = (event: {
      results: SpeechRecognitionResult[]
    }) => {
      this.results = [...event.results]
      console.log('result4:', this.results)
    }
  }

  startSpeech() {
    console.log('111111111111')
    this.recognition.start()
  }

  stopSpeech(callback: (results: string) => void) {
    console.log('result1:', this.results)
    this.recognition.onend = () => {
      debugger
      callback(this.results.map(result => result[0].transcript).join())
      console.log('result3:', this.results)
    }
    debugger
    this.recognition.stop()
  }
}

export const EnglishRecognizer = new SpeechRecognizer('en-US')