const recognition = new (window as any).webkitSpeechRecognition()
recognition.lang = 'en-US'
recognition.continuous = true
let results: SpeechRecognitionResult[] = []
recognition.onresult = (event: {
  results: SpeechRecognitionResult[]
}) => {
  results = [...event.results]
}

let onStart: (() => void) | null = null
let onStopSpeech: (() => void) | null = null
let speechKeyPress = false
function onKeydown(event: KeyboardEvent) {
  if (event.key === 'l' && event.altKey && !speechKeyPress) {
    speechKeyPress = true
    if (onStart) {
      onStart()
      recognition.start()
    }
  }
}
function onKeyup(event: KeyboardEvent) {
  if (event.key === 'Alt' || event.key === 'l' && speechKeyPress) {
    speechKeyPress = false
    recognition.stop()
    if (onStopSpeech) {
      onStopSpeech()
    }
  }
}
document.addEventListener('keydown', onKeydown)
document.addEventListener('keyup', onKeyup)

export function voiceInstall(onStart0: () => void, onEnd0: (results: string) => void, onStopSpeech0: (() => void) | null = null) {
  onStart = onStart0
  recognition.onend = () => {
    onEnd0(results.map(result => result[0].transcript).join())
  }
  onStopSpeech = onStopSpeech0
}

export function voiceUninstall() {
  onStart = null
  onStopSpeech = null
}