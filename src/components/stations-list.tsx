import { useCallback } from 'react'
import { RadioStation } from '../models/radio-station'
import { StationListItem } from './station-list-item'

type StationsListProps = {
  stations: RadioStation[]
  onStationSelected: (selected: RadioStation) => void
}

export const StationsList = ({ stations, onStationSelected }: StationsListProps) => {
  const onStationSelectedHandler = useCallback(
    async (station: RadioStation) => {
      alert(`You selected radio ${station.name}`)

      onStationSelected(station)
    },
    [onStationSelected]
  )

  return (
    <ul className="border border-gray-500 rounded-md px-6 py-6 flex flex-col overflow-y-auto h-80 gap-y-6 md:gap-y-3">
      {stations.map((station: RadioStation) => (
        <StationListItem
          key={station.id}
          station={station}
          onStationSelected={onStationSelectedHandler}
        />
      ))}
    </ul>
  )
}
