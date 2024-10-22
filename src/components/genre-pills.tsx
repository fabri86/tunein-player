import cx from 'classnames'

type GenrePillsProps = {
  genres: string[]
  selectedGenre: string | null
  handleGenreSelection: (selected: string) => void
}

export const GenrePills = ({ genres, selectedGenre, handleGenreSelection }: GenrePillsProps) => {
  const getPillClasses = (genre: string) =>
    cx('m-0.5 px-2 py-1.5 rounded-full hover:scale-105', {
      'bg-pink-500 text-white scale-100': selectedGenre === genre,
      'bg-gray-200 text-gray-800 scale-90': selectedGenre !== genre,
    })

  return (
    <div className="my-3 text-sm md:text-base">
      <p className="my-2 ml-2">Toggle tags to filter radio stations</p>

      {genres.map((genre: string) => (
        <button
          aria-label={`toggle ${genre} pill`}
          key={`${genre}-pill`}
          className={getPillClasses(genre)}
          onClick={() => handleGenreSelection(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  )
}
