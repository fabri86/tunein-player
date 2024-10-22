import { useCallback, useState } from 'react'
import { RadioStation } from '../models/radio-station'
import { StationListItem } from './station-list-item'

type StationsListProps = {
  stations: RadioStation[]
  selected: RadioStation | null
  onStationSelected: (selected: RadioStation) => void
}

export const StationsList = ({ stations, onStationSelected, selected }: StationsListProps) => {
  const [showRating, setShowRating] = useState<boolean>(false)

  const onStationSelectedHandler = useCallback(
    async (station: RadioStation) => {
      onStationSelected(station)
    },
    [onStationSelected]
  )

  return (
    <>
      <ul className="border border-gray-500 rounded-md px-3 md:px-6 py-4 md:py-6 flex flex-col overflow-y-auto h-80 gap-y-6 md:gap-y-3">
        {stations.map((station: RadioStation) => (
          <StationListItem
            key={station.id}
            station={station}
            isSelected={station.id === selected?.id}
            onStationSelected={onStationSelectedHandler}
            showRating={showRating}
          />
        ))}
      </ul>

      <div className="flex justify-end gap-x-3 my-3 items-center">
        <label className="flex items-center text-sm md:text-md">
          <span className="mr-2 hover:cursor-pointer">Show ratings info</span>
          <input
            className="hover:cursor-pointer"
            type="checkbox"
            onClick={() => setShowRating((prevValue) => !prevValue)}
          />
        </label>
      </div>
    </>
  )
}
