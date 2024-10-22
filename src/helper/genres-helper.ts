import { RadioStation } from '../models/radio-station'

export const getGenresFromTags = (stations: RadioStation[]) => {
  const genresSet = new Set<string>()

  const uniqueGenres = stations.reduce<Set<string>>((acc: Set<string>, station: RadioStation) => {
    station.tags.forEach((tag) => {
      if (!acc.has(tag)) {
        acc.add(tag)
      }
    })

    return acc
  }, genresSet)

  return Array.from(uniqueGenres)
}
