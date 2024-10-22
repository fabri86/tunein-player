type GenrePillsProps = {
  genres: string[]
  selectedGenre: string | null
  handleGenreSelection: (selected: string) => void
}

export const GenrePills = ({ genres, selectedGenre, handleGenreSelection }: GenrePillsProps) => (
  <div className="my-3 text-sm md:text-base">
    {genres.map((genre: string) => (
      <button
        key={`${genre}-pill`}
        className={`m-0.5 px-2 py-1.5 rounded-full ${
          selectedGenre === genre
            ? 'bg-pink-500 text-white scale-100'
            : 'bg-gray-200 text-gray-800 scale-90'
        }`}
        onClick={() => handleGenreSelection(genre)}
      >
        {genre}
      </button>
    ))}
  </div>
)
