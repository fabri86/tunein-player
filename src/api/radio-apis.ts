import config from '../config.json'

export const fetchRadioStations = async () => {
  const response = await fetch(config.radioStationsUrl)

  if (!response.ok) {
    throw new Error('Could not fetch radio stations')
  }

  return response.json()
}
