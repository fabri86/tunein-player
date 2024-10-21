import './App.css'

import { useFetchRadioStations } from './hooks/use-get-radio-station'
import { Loader } from './components/shared/loader'
import { ErrorTile } from './components/shared/error-tile'

const App = () => {
  const { stations, isLoading, error } = useFetchRadioStations()

  return (
    <div className="flex flex-col justify-center items-center gap-y-20">
      <div className="w-68">
        <h1 className="text-4xl text-blue-300">Tunein Radio</h1>
        <p className="text-xs mt-0 text-end">by fabri86</p>
      </div>

      {error ? (
        <ErrorTile error={error} />
      ) : (
        <div className="flex flex-col md:flex-row md:gap-x-20 w-full gap-y-20 md:gap-y-0">
          <div className="w-full md:w-1/2">{` --> Player placeholder <-- `}</div>

          {isLoading ? (
            <Loader title="Loading radio stations" />
          ) : (
            <div className="w-full md:w-1/2">{` --> Radio stations list placeholder <--`}</div>
          )}
        </div>
      )}
    </div>
  )
}

export default App
