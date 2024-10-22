import { Tooltip } from 'react-tooltip'
import cx from 'classnames'

import { RadioStation } from '../models/radio-station'
import { FaPlayCircle } from 'react-icons/fa'
import { PlayerButton } from './shared/player-button'
import { Rating } from './shared/rating'

type StationListItemProps = {
  station: RadioStation
  isSelected: boolean
  onStationSelected: (stationId: RadioStation) => Promise<void>
  showRating?: boolean
}

export const StationListItem = ({
  station,
  isSelected,
  onStationSelected,
  showRating = false,
}: StationListItemProps) => {
  const stationNameClasses = cx(
    'ml-3 text-start overflow-x-hidden text-ellipsis text-nowrap whitespace-nowrap',
    {
      'text-highlighted underline': isSelected,
    }
  )

  const playIconClasses = cx('text-2xl focus:outline-none hover:text-green-500 hover:scale-125', {
    'text-highlighted animate-pulse': isSelected,
  })

  return (
    <li className="flex gap-x-12 items-center w-auto scale">
      <span className="items-start overflow-x-hidden grow">
        <span className="flex my-1.5">
          <img className="rounded-full h-6 w-6" src={station.imgUrl} alt={`${station.name} logo`} />
          <p className={stationNameClasses}>{station.name}</p>
        </span>

        {showRating && (
          <>
            <Rating label="Popularity" score={station.popularity} maxScore={5} />
            <Rating label="Reliability" score={station.reliability} maxScore={100} />
          </>
        )}
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
