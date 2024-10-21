type ErrorTileProps = {
  error: string
}

export const ErrorTile = ({ error = 'An unknown error occurred' }: ErrorTileProps) => (
  <div className="bg-red-400 rounded-md shadow-md p-4 text-gray-200">
    <h3 className="text-sm">We are terribly sorry</h3>

    <p className="font-semibold">Tunein Radio is currently unavailable</p>
    {error && <p className="text-md mt-3 italic">Error details: {error}</p>}
  </div>
)
