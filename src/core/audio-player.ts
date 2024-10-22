type AudioPlayerCtorArgs = {
  stationUrl: string
  errorCallback?: (error: string) => void
  successCallback?: () => void
}

export class AudioPlayer {
  private audio: HTMLAudioElement
  private successCallback: () => void
  private errorCallback: (error: string) => void

  constructor({ stationUrl, successCallback, errorCallback }: AudioPlayerCtorArgs) {
    this.audio = new Audio(stationUrl)
    this.errorCallback = errorCallback ? errorCallback : () => {}
    this.successCallback = successCallback ? successCallback : () => {}
  }

  play(): void {
    this.audio
      .play()
      .then(() => this.successCallback?.())
      .catch((err) => this.errorCallback?.(err))
  }

  pause(): void {
    this.audio.pause()
  }

  isPlaying(): boolean {
    return !this.audio.paused
  }

  toggleMute(): boolean {
    this.audio.muted = !this.audio.muted
    return this.audio.muted
  }

  dispose(): void {
    this.pause()
    this.audio.src = ''
    this.audio.load()
  }
}
