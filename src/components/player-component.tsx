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
  const [animationKey, setAnimationKey] = useState<number>(0)

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
      setAnimationKey((prevValue) => prevValue + 1)
    }

    return () => {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.dispose()
        audioPlayerRef.current = null
      }
    }
  }, [selected])

  return (
    <div className="border border-gray-800 p-3 bg-gray-500 flex flex-col justify-center items-center rounded-md">
      <p className="text-md my-0.5 md:text-base md:my-1">
        {selected ? `You are listening to` : `No radio selected`}
      </p>

      {selected && (
        <span className="px-4 md:px-6 py-0.5 rounded-md bg-blue-500 text-lg md:text-xl w-full md:w-1/2 my-1 md:my-2 font-semibold">
          {selected.name}
        </span>
      )}

      {selected && (
        <span className="mt-2 md:mt-4">
          {!isPlaying ? (
            <PlayerButton ariaLabel="player play button" onClickHandler={handlePlayPause}>
              <FaPlayCircle
                className="text-4xl text-green-300"
                data-tooltip-id="player-play-btn"
                data-tooltip-content="Play"
              />
            </PlayerButton>
          ) : (
            <PlayerButton ariaLabel="player pause button" onClickHandler={handlePlayPause}>
              <FaPauseCircle
                className="text-4xl text-green-300"
                data-tooltip-id="player-pause-btn"
                data-tooltip-content="Pause"
              />
            </PlayerButton>
          )}
        </span>
      )}

      {selected?.description && (
        <div key={animationKey} className="overflow-hidden whitespace-nowrap w-full my-2">
          <div className="inline-block animate-marquee">{selected?.description}</div>
        </div>
      )}
    </div>
  )
}
