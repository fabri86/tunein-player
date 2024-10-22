import cx from 'classnames'

type PlayerButtonProps = {
  children: React.ReactElement
  ariaLabel: string
  onClickHandler: () => void
  isDisabled?: boolean
}

export const PlayerButton = ({
  ariaLabel,
  children: icon,
  isDisabled = false,
  onClickHandler,
}: PlayerButtonProps) => {
  const buttonClasses = cx('outline-none focus:outline-none hover:scale-110', {
    'cursor-not-allowed text-gray-200': isDisabled,
  })

  return (
    <>
      <button
        className={buttonClasses}
        aria-label={ariaLabel}
        disabled={isDisabled}
        onClick={onClickHandler}
      >
        {icon}
      </button>
    </>
  )
}
