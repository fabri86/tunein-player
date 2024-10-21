import { useCallback } from 'react'
import { RadioStation } from '../models/radio-station'
import { StationListItem } from './station-list-item'

type StationsListProps = {
  stations: RadioStation[]
}

export const StationsList = ({ stations }: StationsListProps) => {
  const onClickHandler = useCallback(async (station: RadioStation) => {
    alert(`Playing now radio ${station.name}`)
  }, [])

  return (
    <ul className="border border-gray-500 rounded-md px-6 py-6 flex flex-col overflow-y-auto h-80 gap-y-6 md:gap-y-3">
      {stations.map((station: RadioStation) => (
        <StationListItem key={station.id} station={station} onClickHandler={onClickHandler} />
      ))}
    </ul>
  )
}
