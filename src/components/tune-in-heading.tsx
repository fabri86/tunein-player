import { FaRadio, FaRegCopyright } from 'react-icons/fa6'

export const TuneInHeading = () => (
  <div className="w-68 relative">
    <h1 className="text-4xl text-blue-300">TuneIn Radio</h1>
    <FaRadio className="absolute text-sm top-0 -right-3 text-blue-300" />
    <span className="flex justify-end gap-x-1 text-xs items-center">
      <FaRegCopyright />
      <h2 className="mt-0 text-end">fabri86</h2>
    </span>
  </div>
)
