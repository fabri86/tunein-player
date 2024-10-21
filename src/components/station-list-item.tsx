import { Tooltip } from 'react-tooltip'

import { RadioStation } from '../models/radio-station'
import { FaPlayCircle } from 'react-icons/fa'
import { PlayerButton } from './shared/player-button'

type StationListItemProps = {
  station: RadioStation
  onClickHandler: (stationId: RadioStation) => Promise<void>
}

export const StationListItem = ({ station, onClickHandler }: StationListItemProps) => {
  return (
    <li className="flex gap-x-12 items-center w-auto">
      <span className="flex items-start overflow-x-hidden grow">
        <img className="rounded-full h-6 w-6" src={station.imgUrl} alt={`${station.name} logo`} />
        <p className="ml-3 text-start overflow-x-hidden text-ellipsis text-nowrap whitespace-nowrap">
          {station.name}
        </p>
      </span>

      <span className="w-3 flex justify-end overflow-visible">
        <PlayerButton ariaLabel="play radio" onClickHandler={() => onClickHandler(station)}>
          <FaPlayCircle
            className="text-2xl"
            data-tooltip-id={`${station.name}-play-action`}
            data-tooltip-content={`Play ${station.name}`}
          />
        </PlayerButton>
        <Tooltip id={`${station.name}-play-action`} place="left" />
      </span>
    </li>
  )
}
