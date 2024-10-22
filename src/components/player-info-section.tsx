import { RadioStation } from '../models/radio-station'
import TEXT from '../text'

type PlayerStationInfoSectionProps = {
  selected: RadioStation | null
  animationKey: number
}

export const PlayerStationInfoSection = ({
  animationKey,
  selected,
}: PlayerStationInfoSectionProps) => (
  <>
    <p className="text-sm my-0.5 md:text-base md:my-1">
      {selected ? TEXT.YOU_LISTENING_TO : TEXT.NO_RADIO_SELECTED}
    </p>
    <p className="px-2 py-0.5 rounded-md border border-dashed border-white bg-blue-400 text-lg md:text-xl w-full my-1 md:my-2 font-semibold text-center">
      {selected?.name ?? '-'}
    </p>

    <div
      key={animationKey}
      className="overflow-hidden whitespace-nowrap w-full mt-1.5 text-sm md:text-md"
    >
      <p className="inline-block animate-marquee">{selected?.description ?? TEXT.HINT_MESSAGE}</p>
    </div>
  </>
)
