import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'
import { RadioStation } from '../models/radio-station'
import { PlayerButton } from './shared/player-button'

type PlayerProps = {
  selected: RadioStation | null
  isPlaying?: boolean
  onClickedPlay: () => void
}

export const Player = ({ isPlaying = false, selected, onClickedPlay }: PlayerProps) => {
  return (
    <div className="border border-gray-800 p-3 bg-gray-400 flex flex-col justify-center items-center rounded-md">
      <p className="my-2">
        {selected ? `You are listening to ${selected.name}` : `No radio selected`}
      </p>
      <h2 className=" bg-green-500 text-lg">{selected?.name ?? ''}</h2>
      <p>{selected?.description ?? ''}</p>

      <span className="mt-4">
        {!isPlaying ? (
          <PlayerButton ariaLabel="player play button" onClickHandler={onClickedPlay}>
            <FaPlayCircle
              className="text-4xl text-black"
              data-tooltip-id="player-play-btn"
              data-tooltip-content="Play"
            />
          </PlayerButton>
        ) : (
          <PlayerButton ariaLabel="player pause button" onClickHandler={onClickedPlay}>
            <FaPauseCircle
              className="text-4xl text-black"
              data-tooltip-id="player-pause-btn"
              data-tooltip-content="Pause"
            />
          </PlayerButton>
        )}
      </span>
    </div>
  )
}
