export class AudioPlayer {
  private audio: HTMLAudioElement

  constructor(stationUrl: string) {
    this.audio = new Audio(stationUrl)
  }

  play(): void {
    this.audio.play()
  }

  pause(): void {
    this.audio.pause()
  }

  isPlaying(): boolean {
    return !this.audio.paused
  }

  dispose(): void {
    this.pause()
    this.audio.src = ''
    this.audio.load()
  }
}
