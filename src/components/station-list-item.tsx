import { Tooltip } from 'react-tooltip'

import { RadioStation } from '../models/radio-station'
import { FaPlayCircle } from 'react-icons/fa'
import { PlayerButton } from './shared/player-button'
import cx from 'classnames'

type StationListItemProps = {
  station: RadioStation
  isSelected: boolean
  onStationSelected: (stationId: RadioStation) => Promise<void>
}

export const StationListItem = ({
  station,
  isSelected,
  onStationSelected,
}: StationListItemProps) => {
  const stationNameClasses = cx(
    'ml-3 text-start overflow-x-hidden text-ellipsis text-nowrap whitespace-nowrap',
    {
      'text-green-300 underline': isSelected,
    }
  )

  const playIconClasses = cx('text-2xl focus:outline-none hover:text-green-500', {
    'text-green-300 animate-pulse': isSelected,
  })

  return (
    <li className="flex gap-x-12 items-center w-auto">
      <span className="flex items-start overflow-x-hidden grow">
        <img className="rounded-full h-6 w-6" src={station.imgUrl} alt={`${station.name} logo`} />
        <p className={stationNameClasses}>{station.name}</p>
      </span>

      <span className="w-3 flex justify-end overflow-visible">
        <PlayerButton ariaLabel="play radio" onClickHandler={() => onStationSelected(station)}>
          <FaPlayCircle
            className={playIconClasses}
            data-tooltip-id={`${station.name}-play-action`}
            data-tooltip-content={`Play ${station.name}`}
          />
        </PlayerButton>
        {!isSelected && <Tooltip id={`${station.name}-play-action`} place="left" />}
      </span>
    </li>
  )
}
