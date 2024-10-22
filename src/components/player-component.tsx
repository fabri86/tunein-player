import { useEffect, useRef, useState } from 'react'
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'

import { AudioPlayer } from '../core/audio-player'
import { RadioStation } from '../models/radio-station'
import { PlayerButton } from './shared/player-button'

type PlayerComponentProps = {
  selected: RadioStation | null
}

export const PlayerComponent = ({ selected }: PlayerComponentProps) => {
  const audioPlayerRef = useRef<AudioPlayer | null>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const handlePlayPause = () => {
    if (audioPlayerRef.current) {
      if (isPlaying) {
        audioPlayerRef.current.pause()
      } else {
        audioPlayerRef.current.play()
      }

      if (audioPlayerRef.current) {
        setIsPlaying(audioPlayerRef.current?.isPlaying())
      }
    }
  }

  useEffect(() => {
    if (selected) {
      audioPlayerRef.current = new AudioPlayer(selected.streamUrl)
      audioPlayerRef.current.play()

      setIsPlaying(audioPlayerRef.current?.isPlaying())
    }

    return () => {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.dispose()
        audioPlayerRef.current = null
      }
    }
  }, [selected])

  return (
    <div className="border border-gray-800 p-3 bg-gray-400 flex flex-col justify-center items-center rounded-md">
      <p className="my-2">
        {selected ? `You are listening to ${selected.name}` : `No radio selected`}
      </p>
      <h2 className=" bg-green-500 text-lg">{selected?.name ?? ''}</h2>

      {selected && (
        <span className="mt-4">
          {!isPlaying ? (
            <PlayerButton ariaLabel="player play button" onClickHandler={handlePlayPause}>
              <FaPlayCircle
                className="text-4xl text-black"
                data-tooltip-id="player-play-btn"
                data-tooltip-content="Play"
              />
            </PlayerButton>
          ) : (
            <PlayerButton ariaLabel="player pause button" onClickHandler={handlePlayPause}>
              <FaPauseCircle
                className="text-4xl text-black"
                data-tooltip-id="player-pause-btn"
                data-tooltip-content="Pause"
              />
            </PlayerButton>
          )}
        </span>
      )}

      {selected?.description && <p className="text-sm my-3">{selected.description}</p>}
    </div>
  )
}
