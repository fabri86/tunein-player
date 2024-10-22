import { useEffect, useRef, useState } from 'react'
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'
import { IoRadioOutline } from 'react-icons/io5'

import { AudioPlayer } from '../core/audio-player'
import { RadioStation } from '../models/radio-station'
import { PlayerButton } from './shared/player-button'
import { toast } from 'react-toastify'

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

  const handleError = (error: string) => {
    toast.error(`Cannot play ${selected?.name}: ${error}`, { autoClose: 2000 })

    setIsPlaying(false)
  }

  const handleSuccess = () => {
    toast.success(`Now playing ${selected?.name}`)
  }

  useEffect(() => {
    if (selected) {
      audioPlayerRef.current = new AudioPlayer({
        stationUrl: selected.streamUrl,
        errorCallback: handleError,
        successCallback: handleSuccess,
      })
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
    <div className="relative p-3 bg-gray-800 border border-gray-500 flex flex-col items-center rounded-md mt-4 md:mt-0 mb-4 justify-start">
      <p className="text-sm my-0.5 md:text-base md:my-1">
        {selected ? `You are listening to` : `No radio selected`}
      </p>

      {selected && (
        <span className="px-2 py-0.5 rounded-md border border-dashed border-white bg-blue-500 text-lg md:text-xl w-full my-1 md:my-2 font-semibold text-center">
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
        <div
          key={animationKey}
          className="overflow-hidden whitespace-nowrap w-full mt-2.5 text-sm md:text-md"
        >
          <div className="inline-block animate-marquee">{selected?.description}</div>
        </div>
      )}

      {isPlaying && (
        <div className="absolute top-2 right-2 animate-pulse">
          <IoRadioOutline className="text-white" />
        </div>
      )}
    </div>
  )
}
