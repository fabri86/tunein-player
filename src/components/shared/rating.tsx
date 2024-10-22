import { FaStar, FaRegStar } from 'react-icons/fa' // Full star and empty star icons

type RatingProps = {
  label: string
  score?: number
  maxScore: number
}

export const Rating = ({ label, score = 0, maxScore }: RatingProps) => {
  const normalizedScore = (score / maxScore) * 5
  const stars = Array(5).fill(0)

  return (
    <div className="flex text-xs my-0.5">
      <label>{label}:</label>

      <span className="ml-2 flex">
        {stars.map((_, index) =>
          index < Math.round(normalizedScore) ? (
            <FaStar key={index} className="text-pink-400" />
          ) : (
            <FaRegStar key={index} className="text-gray-400" />
          )
        )}
        <p className="mx-2">
          ({score}/{maxScore})
        </p>
      </span>
    </div>
  )
}
