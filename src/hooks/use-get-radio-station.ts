import { useEffect, useState } from 'react'

import { RadioStation } from '../models/radio-station'
import { fetchRadioStations } from '../api/radio-apis'

type RadioStationsData = {
  stations: RadioStation[]
  isLoading: boolean
  error: string
}

export const useFetchRadioStations = (): RadioStationsData => {
  const [stations, setStations] = useState<RadioStation[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const loadStations = async () => {
      try {
        const response = await fetchRadioStations()
        setStations(response.data)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError(`Unknown error: ${error?.toString()}`)
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadStations()
  }, [])

  return { stations, isLoading, error }
}
