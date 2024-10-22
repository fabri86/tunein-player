import { useMemo, useState } from 'react'
import './App.css'

import { useFetchRadioStations } from './hooks/use-get-radio-station'
import { Loader } from './components/shared/loader'
import { ErrorTile } from './components/shared/error-tile'
import { StationsList } from './components/stations-list'
import { RadioStation } from './models/radio-station'
import { PlayerComponent } from './components/player-component'
import { GenrePills } from './components/genre-pills'
import { getGenresFromTags } from './helper/genres-helper'
import { FaRadio } from 'react-icons/fa6'

const App = () => {
  const { stations, isLoading, error } = useFetchRadioStations()
  const genres = useMemo(() => getGenresFromTags(stations), [stations])

  const [selectedRadio, setSelectedRadio] = useState<RadioStation | null>(stations[0])
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)

  const filteredStations = useMemo(() => {
    if (!stations) {
      return []
    }

    return !selectedGenre
      ? stations
      : stations.filter((station) => station.tags.some((tag) => tag === selectedGenre))
  }, [stations, selectedGenre])

  const handleGenrePillSelection = (selected: string) => {
    if (selected === selectedGenre) {
      setSelectedGenre(null)
    } else {
      setSelectedGenre(selected)
    }
  }

  return (
    <div className="flex flex-col items-center gap-y-1 p-4 md:p-6 lg:p-8">
      <div className="w-68 relative">
        <h1 className="text-4xl text-blue-300">Tunein Radio</h1>
        <FaRadio className="absolute text-sm top-0 -right-3 text-blue-300" />
        <p className="text-xs mt-0 text-end">by fabri86</p>
      </div>

      {error ? (
        <ErrorTile error={error} />
      ) : (
        <div className="flex flex-col md:flex-row md:gap-x-10 w-full md:my-16 lg:my-24">
          <div className="w-full md:w-1/2">
            <PlayerComponent selected={selectedRadio} />

            <GenrePills
              genres={genres}
              selectedGenre={selectedGenre}
              handleGenreSelection={handleGenrePillSelection}
            />
          </div>

          {isLoading ? (
            <Loader title="Loading radio stations" />
          ) : (
            <div className="w-full md:w-1/2 h-20 md:h-60 lg:h-auto justify-start">
              <StationsList
                stations={filteredStations}
                selected={selectedRadio}
                onStationSelected={(selected) => setSelectedRadio(selected)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App
