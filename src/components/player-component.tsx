import { useCallback, useEffect, useRef, useState } from 'react'
import { Tooltip } from 'react-tooltip'
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'
import { IoVolumeMute } from 'react-icons/io5'
import { VscUnmute } from 'react-icons/vsc'

import { IoRadioOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'

import { AudioPlayer } from '../core/audio-player'
import { RadioStation } from '../models/radio-station'
import { PlayerButton } from './shared/player-button'

import { PlayerStationInfoSection } from './player-info-section'

const RESET_THRESHOLD = 1000000

type PlayerComponentProps = {
  selected: RadioStation | null
}

export const PlayerComponent = ({ selected }: PlayerComponentProps) => {
  const audioPlayerRef = useRef<AudioPlayer | null>(null)

  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(false)
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

  const handleError = useCallback(
    (error: string) => {
      toast.error(`Cannot play ${selected?.name}: ${error}`, { autoClose: 2000 })

      setIsPlaying(false)
    },
    [selected]
  )

  const handleSuccess = useCallback(() => {
    toast.success(`Now playing ${selected?.name}`)
  }, [selected])

  const handleToggleMute = useCallback(() => {
    if (audioPlayerRef.current) {
      const newValue = audioPlayerRef.current.toggleMute()
      setIsMuted(newValue)
    }
  }, [audioPlayerRef])

  useEffect(() => {
    if (selected) {
      audioPlayerRef.current = new AudioPlayer({
        stationUrl: selected.streamUrl,
        errorCallback: handleError,
        successCallback: handleSuccess,
      })

      audioPlayerRef.current.play()

      setIsPlaying(audioPlayerRef.current?.isPlaying())
      setAnimationKey((prevKey) => (prevKey >= RESET_THRESHOLD ? 0 : prevKey + 1))
    }

    return () => {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.dispose()
        audioPlayerRef.current = null
      }
    }
  }, [selected, handleError, handleSuccess])

  return (
    <div className="relative p-3 bg-gray-800 border border-gray-500 flex flex-col items-center rounded-md mt-4 md:mt-0 mb-4 min-h-48 h-auto justify-between">
      <PlayerStationInfoSection selected={selected} animationKey={animationKey} />

      <span className="mt-2 md:mt-4">
        {!isPlaying ? (
          <PlayerButton
            ariaLabel="player play button"
            onClickHandler={() => selected && handlePlayPause()}
            isDisabled={!selected}
          >
            <FaPlayCircle
              className={`text-4xl focus:outline-none ${
                selected ? 'hover:scale-110 hover:text-highlighted' : 'text-gray-400'
              }`}
              data-tooltip-id="player-play-btn"
              data-tooltip-content="Play"
            />
          </PlayerButton>
        ) : (
          <PlayerButton
            ariaLabel="player pause button"
            onClickHandler={() => selected && handlePlayPause()}
            isDisabled={!selected}
          >
            <FaPauseCircle
              className={`text-4xl focus:outline-none ${
                selected ? 'hover:scale-110 hover:text-highlighted' : 'text-gray-400'
              }`}
              data-tooltip-id="player-pause-btn"
              data-tooltip-content="Pause"
            />
          </PlayerButton>
        )}

        {isPlaying && (
          <div className="absolute bottom-0 right-4">
            <PlayerButton
              ariaLabel="player mute button"
              onClickHandler={() => selected && handleToggleMute()}
              isDisabled={!selected}
            >
              {isMuted ? (
                <VscUnmute
                  className={`text-2xl focus:outline-none ${
                    selected ? 'hover:scale-110 hover:text-highlighted' : 'text-gray-400'
                  }`}
                  data-tooltip-id="player-unmute-btn"
                  data-tooltip-content="Unmute"
                />
              ) : (
                <IoVolumeMute
                  className={`text-2xl focus:outline-none ${
                    selected ? 'hover:scale-110 hover:text-highlighted' : 'text-gray-400'
                  }`}
                  data-tooltip-id="player-mute-btn"
                  data-tooltip-content="Mute"
                />
              )}
            </PlayerButton>
          </div>
        )}

        <Tooltip id="player-pause-btn" place="right" />
        <Tooltip id="player-play-btn" place="right" />
        <Tooltip id="player-mute-btn" place="right" />
        <Tooltip id="player-unmute-btn" place="right" />
      </span>

      {selected && isPlaying && (
        <div className="absolute top-3 right-3 animate-pulse">
          <IoRadioOutline className="text-white text-lg md:text-xl" />
        </div>
      )}
    </div>
  )
}
